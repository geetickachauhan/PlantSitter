function createNavbar(){
	//create navbar with click listeners
	//attach it to the document
    username = 'Gandalf';
    navbar = Util.create("nav");
    navbar.classList.add("navbar", "navbar-expand-lg", "navbar-dark");
    inner = '<a class="navbar-brand mt-1" href="#">PlantSitter</a><button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#main-navbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button><div class="container"><div class="navbar-collapse collapse" id="main-navbar"><ul class="navbar-nav nav-fill w-100"><li class="nav-item mt-1"><a class="nav-link" href="#">My Plants</a></li><li class="nav-item mt-1"><a class="nav-link" href="#">PlantSit</a></li><li class="nav-item mt-1"><a class="nav-link" href="#">Adopt</a></li><li class="nav-item mt-1"><a class="nav-link" href="#"><span class="fas fa-bell fa-lg"></span></a></li><li class="nav-item dropdown text-right mt-1"><a class="nav-link dropdown-toggle" href="#" id="username" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></a><div class="dropdown-menu" aria-labelledby="navbarDropdown"><a class="dropdown-item" href="#"><span class="fas fa-id-card fa-lg text-gray margin-right"></span>Profile and Calendar</a><a class="dropdown-item" href="#"><span class="fas fa-camera fa-lg text-gray margin-right"></span>Photos by Volunteers</a><div class="dropdown-divider"></div><a class="dropdown-item" href="#"><span class="fas fa-sign-out-alt fa-lg text-gray margin-right"></span>Signout</a></div></li></ul></div></div>';
    navbar.innerHTML = inner;
    body = Util.one('body');
    body.insertBefore(navbar, body.firstChild);
    Util.one('#username').innerHTML = username;
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