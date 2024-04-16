import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import Projectstatuscreate from "./pages/Projectstatus/projectstatusCreate";

function ProjectstatusaddLayouts() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <Projectstatuscreate/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default ProjectstatusaddLayouts;