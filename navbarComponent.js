function createNavbar(){
	//create navbar with click listeners
	//attach it to the document

    navbar = Util.create("nav");
    navbar.classList.add("navbar", "navbar-expand-lg", "navbar-dark", "sticky-top");
    inner = `
    <a class="navbar-brand mt-1" href="homepage.html"><span class="fab fa-pagelines fa-lg margin-right"></span>PlantSitter</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span></button>
    <div class="container">
        <div class="navbar-collapse collapse" id="main-navbar">
            <ul class="navbar-nav nav-fill w-100">
                <li class="nav-item mt-1"><a class="nav-link" href="homepage.html">My Plants</a></li>
                <li class="nav-item mt-1"><a class="nav-link" href="#">PlantSit</a></li>
                <li class="nav-item mt-1"><a class="nav-link" href="#">Adopt</a></li>
                <li class="nav-item dropdown mt-1">
                    <a class="nav-link dropdown-toggle" href="#" id="notifDropDown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><span class="fas fa-bell fa-lg"></span></a>
                    <div class="dropdown-menu" aria-labelledby="notifDropdown" id="g-notification">
                    </div>
                </li>
                <li class="nav-item dropdown text-right mt-1">
                  <a class="nav-link dropdown-toggle" href="#" id="usernameDropDown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a>
                    <div class="dropdown-menu" aria-labelledby="usernameDropdown">
                      <a class="dropdown-item" href="profile.html">
                        <span class="fas fa-id-card fa-lg text-gray margin-right"></span>
                        Profile and Calendar
                      </a>
                      <a class="dropdown-item" href="#">
                        <span class="fas fa-camera fa-lg text-gray margin-right"></span>
                        Photos by Volunteers
                      </a>
                    <div class="dropdown-divider"></div>
                    <a class="dropdown-item" href="#">
                      <span class="fas fa-sign-out-alt fa-lg text-gray margin-right"></span>
                      Signout
                    </a>
                  </div>
                </li>
              </ul>
              </div></div>`;



    navbar.innerHTML = inner;
    body = Util.one('body');
    body.insertBefore(navbar, body.firstChild);
    Util.one('#usernameDropDown').innerHTML = logged_in_user.firstName;
    notification = Util.one('#g-notification');
    notifInner = `
      <a class="dropdown-item" href="profile.html">
        Bilbo has requested to <br>care for Grishnakh
        <div class="row text-center">
            <div class="col-sm-6">
            <button type="button" class="btn btn-success"><span class="fas fa-check fa-lg"></span></button>
            </div>
        <div class="col-sm-6">
            <button type="button" class="btn btn-danger"><span class="fas fa-ban fa-lg"></span></button>
        </div>
        </div>
      </a>
    <div class="dropdown-divider"></div>
    <a class="dropdown-item" href="#">
      Water Balrog on 12/3
    </a>`;
   notification.innerHTML = notifInner;
}

function deleteNavbar(){
	navbar = Util.one('nav');
    Util.removeAllChildren(navbar);
    if(navbar != null){
    navbar.parentNode.removeChild(navbar);}
}


//<nav class="navbar navbar-expand-lg navbar-dark">
//    <a class="navbar-brand mt-1" href="#">PlantSitter</a>
//  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//    <span class="navbar-toggler-icon"></span>
//  </button>
//    <div class="container">
//        <div class="navbar-collapse collapse" id="main-navbar">
//            <ul class="navbar-nav nav-fill w-100">
//                <li class="nav-item mt-1">
//                    <a class="nav-link" href="#">My Plants</a>
//                </li>
//                <li class="nav-item mt-1">
//                    <a class="nav-link" href="#">PlantSit</a>
//                </li>
//                <li class="nav-item mt-1">
//                    <a class="nav-link" href="#">Adopt</a>
//                </li>
//                <li class="nav-item mt-1">
//                    <a class="nav-link" href="#"><span class="fas fa-bell fa-lg"></span></a>
//                </li>
//                <li class="nav-item dropdown text-right mt-1">
//                    <a class="nav-link dropdown-toggle" href="#" id="username" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//                      Gandalf
//                    </a>
//                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
//                      <a class="dropdown-item" href="#"><span class="fas fa-id-card fa-lg text-gray margin-right"></span>Profile and Calendar</a>
//                      <a class="dropdown-item" href="#"><span class="fas fa-camera fa-lg text-gray margin-right"></span>Photos by Volunteers</a>
//                      <div class="dropdown-divider"></div>
//                      <a class="dropdown-item" href="#"><span class="fas fa-sign-out-alt fa-lg text-gray margin-right"></span>Signout</a>
//                    </div>
//              </li>
//            </ul>
//        </div>
//    </div>
//</nav>
