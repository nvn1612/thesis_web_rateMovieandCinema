import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import {Login} from "./pages/login/Login";
import {Signup} from "./pages/signup/Signup";
import {VerifySignup} from "./pages/verification-page/VerifySignup";
import {NotifySuccess} from "./pages/verification-page/NotifySuccess";
import {Home} from "./pages/home/Home";
import {ForgotPassword} from "./pages/forgot-password/ForgotPassword";
import {SiderBar} from "./layouts/sider-bar/SiderBar"
import {UserList} from "./pages/admin-page/user/UserList"
import {UserEdit} from "./pages/admin-page/user/userEdit"
import {Header} from "./layouts/header/Header"
import {Footer} from "./layouts/footer/Footer"
import { SummaryMovie } from "./layouts/summary-movie/SummaryMovie";
import { BtnSwitch } from "./components/btn-switch/BtnSwitch";
import { ContentModalRate } from "./layouts/content-modal-rate/ContentModalRate";
import {StarRate} from "./components/star-rate/StarRate"
import { Modal } from "./components/modal/Modal";
import { ModalRateCinema } from "./pages/modal-rate/modal-rate-cinema/ModalRateCinema";
import { ModalRateMovie } from "./pages/modal-rate/modal-rate-movie/ModalRateMovie";
import { BgTop } from "./components/bg-top/BgTop";
import { ProgressBar } from "./components/progress-bar/ProgressBar";
import { ProgressBarGroup } from "./layouts/progress-bar-group/ProgressBarGroup";
import { TotalRate } from "./components/total-rate/TotalRate";
import { CountRate } from "./components/count-rate/CountRate";
import { RateMovie } from "./pages/rate-movie/RateMovie";
import { Avatar } from "./components/avatar/Avatar";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-signup" element={<VerifySignup />} />
        <Route path="/notify-success" element={<NotifySuccess />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/sider-bar" element={<ContentModalRate/>}/>
        <Route path="/summary-movie" element={<StarRate/>}/>
        <Route path="/component" element={<Avatar/>}/>
        <Route path="/layout" element={<ProgressBarGroup/>}/>
        <Route path="/Page" element={<RateMovie/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
