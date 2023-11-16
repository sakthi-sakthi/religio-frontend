import $ from "jquery";

import Navbar from "../../dashboard/includes/Navbar";
import Sidemenubar from "../../dashboard/includes/Sidemenubar";
import Footer from "../../dashboard/includes/Footer";
import Main from "../../dashboard/includes/Main";

function User() {
  var autoLogoutTimer;
  resetTimer();
  $(document).on(
    "mouseover mousedown touchstart click keydown mousewheel DDMouseScroll wheel scroll",
    document,
    function (e) {
      //  console.log(e.type); // Uncomment this line to check which event is occured
      resetTimer();
    }
  );
  // resetTimer is used to reset logout (redirect to logout) time
  function resetTimer() {
    clearTimeout(autoLogoutTimer);
    autoLogoutTimer = setTimeout(idleLogout, 1800000); // 1000 = 1 second
  }

  // idleLogout is used to Actual navigate to logout
  function idleLogout() {
    sessionStorage.removeItem("userDetails");
    window.location.href = "/login"; // Here goes to your logout url
  }
  return (
    <div className="container-scroller">
      <Navbar />
      <div className="container-fluid page-body-wrapper">
        <Sidemenubar />
        <div className="main-panel">
          <Main />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default User;
