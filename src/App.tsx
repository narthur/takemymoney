import React, {useState} from "react";
import "./App.css";
import {getParams} from "./lib/browser";

import Container from "@material-ui/core/Container";
import {
  Button, InputAdornment, TextField,
} from "@material-ui/core";
import {useMutation} from "react-query";
import {chargeUser} from "shared-library";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function App(): JSX.Element {
  const {REACT_APP_APP_URL = "", REACT_APP_BM_CLIENT_ID = ""} = process.env;
  const redirectUri = encodeURIComponent(REACT_APP_APP_URL);
  const params = getParams();
  const username = params.get("username");
  const accessToken = params.get("access_token");
  const enableUrl = `https://www.beeminder.com/apps/authorize?client_id=${REACT_APP_BM_CLIENT_ID}&redirect_uri=${redirectUri}&response_type=token`;
  const [amount, setAmount] = useState<number>(1);
  const [note, setNote] = useState<string>("");
  const isAuthenticated = username && accessToken;

  const {mutate} = useMutation("charge", () => {
    if (!isAuthenticated) {
      throw new Error("Must be authenticated to make charge");
    }
    if (!amount) {
      throw new Error("Must specify amount to be charged");
    }
    return chargeUser(accessToken, amount, note);
  }, {
    onSettled: (data, error, variables, context) => {
      console.log({data, error, variables, context});
    },
  },
  );

  return <Container className={"App"}>
    <h1>Take My Money</h1>

    <p>
    Find yourself needing to send Beeminder some extra money? You can do it
    here.
    </p>

    {!isAuthenticated && <p>
      <Button
        variant={"contained"}
        color={"primary"}
        href={enableUrl}
      >Log in with Beeminder</Button>
    </p>}

    {isAuthenticated && <>
      <p>Logged in as Beeminder user: <strong><a
        href={`https://beeminder.com/${username}`} target={"_blank"}
        rel={"nofollow noreferrer"}>{username}</a></strong></p>
      <TextField
        label={"Amount"}
        type={"number"}
        value={amount}
        onChange={(e) => {
          const num = Number(e.target.value);
          setAmount(num > 1 ? num : 1);
        }}
        InputProps={{
          startAdornment: (<InputAdornment position={"start"}>
            <AttachMoneyIcon/>
          </InputAdornment>),
        }}/><br/><br/>
      <TextField
        label={"Note"}
        multiline
        value={note}
        onChange={(e) => setNote(e.target.value)}
      /><br/><br/>
      <Button
        variant="contained"
        onClick={() => mutate()}
      >Send my money to Beeminder</Button>
    </>}

    <p>Thanks to <a href="https://icons8.com/">Icons8</a> for favicon</p>

  </Container>;
}

export default App;
