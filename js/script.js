// Toggle Visibility Of Navbar When Button Clicked

const navToggle = document.querySelector(".navbar-toggle");
navToggle.addEventListener("click", function () {
  document.querySelector(".portfolio-navbar").classList.toggle("show");
});

// Tab Interface For Resume

const resumeHeading = document.querySelector(".resume-heading");
const resumeTabs = document.querySelectorAll(".resume-tab");

resumeHeading.onclick = (event) => {
  event.preventDefault();
  const clickedItemId = event.target.dataset.id;
  if (clickedItemId) {
    resumeHeading.querySelector(".active").classList.remove("active");
    event.target.classList.add("active");

    resumeTabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    const correspondingTab = document.getElementById(clickedItemId);
    correspondingTab.classList.add("active");
  }
};

// Portfolio Filter

const filterContainer = document.querySelector(".portfolio-filter-nav");
const galleryItems = document.querySelectorAll(".portfolio-item");

filterContainer.addEventListener("click", (e) => {
  e.preventDefault();
  filterContainer.querySelector(".active").classList.remove("active");
  e.target.classList.add("active");
  const filterValue = e.target.getAttribute("data-id");
  galleryItems.forEach((item) => {
    if (item.classList.contains(filterValue) || filterValue === "all") {
      item.classList.remove("hide");
      item.classList.add("show");
    } else {
      item.classList.remove("show");
      item.classList.add("hide");
    }
  });
});

// Navbar Header Sticky While Scroll

function stickyNav() {
  var headerHeight = document.querySelector("#about").offsetHeight / 2;
  var navbar = document.querySelector("header");
  var scrollValue = window.scrollY;

  if (scrollValue > headerHeight) {
    navbar.classList.add("header-sticky");
  } else if (scrollValue < headerHeight) {
    navbar.classList.remove("header-sticky");
  }
}

window.addEventListener("scroll", stickyNav);

// Active Link On Page Scroll

const sections = document.querySelectorAll("section[id]");

function scrollTracker() {
  const currentYScroll = window.scrollY;

  sections.forEach((section) => {
    const sectionHeight = section.offsetHeight;
    const sectionTop = section.offsetTop - 100;
    const id = section.getAttribute("id");
    const currentNavLink = document.querySelector(
      `header .portfolio-navbar a[href*="#${id}"]`
    );
    if (
      currentYScroll > sectionTop &&
      currentYScroll <= sectionTop + sectionHeight
    ) {
      currentNavLink.classList.add("active-link");
    } else {
      currentNavLink.classList.remove("active-link");
    }
  });
}
window.addEventListener("scroll", scrollTracker);

// Dark and Light Theme Toggle

function isLight() {
  return localStorage.getItem("dark-mode");
}

function toggleRootClass() {
  document.querySelector("body").classList.toggle("dark");
}

function toggleLocalStorageItem() {
  if (isLight()) {
    localStorage.removeItem("dark-mode");
  } else {
    localStorage.setItem("dark-mode", "set");
  }
}

if (isLight()) {
  toggleRootClass();
}

document.querySelector(".theme-toggle").addEventListener("click", () => {
  toggleLocalStorageItem();
  toggleRootClass();
});

// Send Email

const msg = document.querySelector(".form-message");

(function () {
  // https://dashboard.emailjs.com/admin/account
  emailjs.init("YOUR_PUBLIC_KEY");
})();

window.onload = function () {
  document
    .getElementById("contact-form")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      document.querySelector(".loader").classList.add("show");
      // Replace With Your Email Service ID & Contact Form ID Which You Will Get After Registering With EmailJs
      emailjs.sendForm("YOUR_CONTACT_SERVICE_ID", "YOUR_CONTACT_FORM_ID", this).then(
        function () {
          document.getElementById("contact-form").reset();
          document.querySelector(".loader").classList.remove("show");
          msg.innerHTML = "";
          msg.innerHTML += "<span class='success-msg'>Email Sent</span>";
          msg.classList.add("show");
          setTimeout(() => msg.classList.remove("show"), 2000);
        },
        function (error) {
          document.querySelector(".loader").classList.toggle("show");
          msg.classList.add("show");
          msg.innerHTML += "<span class='error-msg'>Not Sent ! Sign Up with EmailJS.</span>";
        }
      );
    });
};

//Scroll Reveal

const sr = ScrollReveal({
  reset: true,
  distance: "60px",
  duration: 2500,
  delay: 400,
});

sr.reveal(".about-intro", {
  origin: "left",
});
sr.reveal(
  ".resume-heading,.resume-text,.service-row,.portfolio-wrapper,.contact-general,#contact-form",
  {
    origin: "bottom",
  }
);
sr.reveal(".resume-body", {
  origin: "top",
});
