/* ----------***  HEADER AND NAVIGATION FUNCTIONALIY - MOBILE AND TABLET  ***----------  */

// GET USER SCREEN WIDTH
const viewportWidth = window.innerWidth || document.documentElement.clientWidth;

// ------ HEADER ------

// GET ELEMENTS
const header = document.getElementsByClassName("header")[0];
const menuInputCheck = document.getElementById("navigation__input-check");
const headerMidText = document.getElementsByClassName("header__mid-box")[0];

// ACTIVE MAIN MENU FUNCTION
function mainMenuActive() {
  if (menuInputCheck.checked) {
    header.style.background = "#eee";
    headerMidText.textContent = "Menu";
  } else {
    header.style.background = "#fff";
    headerMidText.textContent = "Management Report";
  }
}
menuInputCheck.addEventListener("change", mainMenuActive);

// ------ NAVIGATION ------

// GET ELEMENTS
const mainMenuItem = document.getElementById("navigation-main-menu-item");
const menuItems = document.getElementsByClassName("navigation__menu-item");
const backToPrimDiv = document.getElementsByClassName(
  "navigation__back-to-prim"
)[0];

// GET AN FILTERD ARRAY WITH ALL MENU ITEMS THAT NOT 'this' KEYWORD
// (the function helps if we have more than 1 submenu to display)
function filterNotClickedMenuItems(itemsCollection, clickedItem) {
  const arrayOfMenuItems = [];
  for (let i = 0; i < itemsCollection.length; i++) {
    arrayOfMenuItems.push(itemsCollection[i]);
  }
  const filterdItemArray = arrayOfMenuItems.filter(
    (item) => item != clickedItem
  );
  return filterdItemArray;
}

// OPEN RELEVANT SUBMENU FUNCTION
function openRelevantSubMenu() {
  // display back to primary menu
  backToPrimDiv.style.display = "block";

  // get all items except the main item, and hide them
  const notClickedItemsArr = filterNotClickedMenuItems(menuItems, this);
  notClickedItemsArr.forEach((item) => (item.style.display = "none"));

  // display relevant sub menu
  this.getElementsByClassName("navigation__submenu")[0].style.display = "block";

  // hide clicked item
  this.getElementsByTagName("div")[0].style.display = "none";

  // change focused item background color
  this.style.background = "#eee";

  // remove padding from menu item
  this.style.padding = "0";
}

// BACK TO PRIM MENU FUNCTION
function closeRelevantSubMenu() {
  // hide back to primary menu
  backToPrimDiv.style.display = "none";

  // display and style back menu item
  for (let i = 0; i < menuItems.length; i++) {
    menuItems[i].style.display = "block";
    menuItems[i].style.padding = "2rem";
    menuItems[i].getElementsByTagName("div")[0].style.display = "block";

    // change focused item background color
    if (menuItems[i].classList.contains("navigation__menu-item-focus")) {
      menuItems[i].style.background = "#97c227";
    } else {
      menuItems[i].style.background = "#fff";
    }
  }
  // hide submenu
  mainMenuItem.getElementsByClassName("navigation__submenu")[0].style.display =
    "none";

  // run overlay on function
  onOverlay();
}

// RUN FUNCTIONS ON MOBILE AND TABLET
if (viewportWidth < 1200) {
  // run open submenu function
  mainMenuItem.addEventListener("click", openRelevantSubMenu);
  // run close submenu function
  backToPrimDiv.addEventListener("click", closeRelevantSubMenu);
}

/* ----------***  SET BACKGROUND TO MAIN AND FOOTER ELEMENTS WHEN SUBMENU IS ACTIVE  ***----------  */
const inputCheckMobile = document.getElementById("navigation__input-check");
const overlay = document.getElementById("overlay");
function onOverlay() {
  overlay.classList.add("overlayActive");
}

function offOverlay() {
  overlay.classList.remove("overlayActive");
}

let toggleBodyBackground = false;
function setBackgroundToBodyWhenMenuIsActive() {
  toggleBodyBackground = !toggleBodyBackground;
  if (toggleBodyBackground) {
    onOverlay();
  } else {
    offOverlay();
  }
}
inputCheckMobile.addEventListener("click", setBackgroundToBodyWhenMenuIsActive);
mainMenuItem.addEventListener("mouseover", onOverlay);
mainMenuItem.addEventListener("mouseleave", offOverlay);
