import {Fragment} from "react"
import {BrowserRouter, Route, Routes} from "react-router-dom"

import { SignIn } from "../pages/signIn";
import { SignUp } from "../pages/signup";
import { Home } from "../pages/home";
import { useAuth } from "../hooks/useAuth";
import { Settings } from "../pages/settings";

const Private = ({ Item }: any) => {
  const { signed } = useAuth();
  return signed ? <Item /> : <SignIn />
}

export function RoutesApp() {
  return (
    <BrowserRouter>
        <Fragment>
            <Routes>
                <Route path="/home" element={<Private Item={Home} />}/>
                <Route path="/settings" element={<Private Item={Settings} />}/>
                <Route path="/" element={<Private Item={Home} />}/>
                <Route path="/sigin"element={<SignIn />}/>
                <Route path="/signup" element={<SignUp />}/>
                <Route path="*" element={<SignIn />}/>
            </Routes>
        </Fragment>
    </BrowserRouter>
  );
}