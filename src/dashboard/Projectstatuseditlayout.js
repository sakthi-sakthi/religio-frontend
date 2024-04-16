import Navbar from "./includes/Navbar";
import Sidemenubar from "./includes/Sidemenubar";
import Footer from "./includes/Footer";

import "./scss/style.scss";
import ProjectstatusEdit from "./pages/Projectstatus/projectstatusEdit";

function ProjectstatuseditLayouts() {
    return (
        <div className="container-scroller">
            <Navbar />
            <div className="container-fluid page-body-wrapper">
            <Sidemenubar />
                <div className="main-panel">
                    <ProjectstatusEdit/>
                    <Footer/>
                </div>
            </div>
        </div>
    );
}

export default ProjectstatuseditLayouts;