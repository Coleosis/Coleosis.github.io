
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    if (!header.classList.contains('header-scrolled')) {
      offset -= 20
    }

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
      } else {
        selectHeader.classList.remove('header-scrolled')
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }


  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Mobile nav dropdowns activate
   */
  on('click', '.navbar .dropdown > a', function(e) {
    if (select('#navbar').classList.contains('navbar-mobile')) {
      e.preventDefault()
      this.nextElementSibling.classList.toggle('dropdown-active')
    }
  }, true)

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Preloader
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove()
    });
  }

  
    /*ask user if they want to build instrument
    let custom = "y";

      custom = prompt("Do you want to build an instrument? (y/n)", "y");

     //loop to initiate if they want to build instrument
     for (let x = 0; x <= 0; x++) {
  
       if (custom == "y") {
       // get description from user
      let description = String(prompt("Describe your dream instrument"));

      // get budget from user
      let budget = parseFloat(prompt("What is your budget?"));

      // display results
      const html = `<p><label>Description: </label>${description}</p>
        <p><label>Budget: </label>${budget}</p>`;
      document.write(html);
      }
    }*/

  // --------------------------  Coles javascript -------------------------------

  // -------- FAQ section ----------
const toggle = evt => {
  const linkElement = evt.currentTarget;                 // get the clicked link element
  const h2Element = linkElement.parentNode;              // get the h2 tag for the <a> tag
  const divElement = h2Element.nextElementSibling;       // get h2's sibling div

  
  if (h2Element.hasAttribute("class")) {
      h2Element.removeAttribute("class");
  } else {
      h2Element.className="close";
  }

  // divElement.classList.toggle("open");
  if (divElement.hasAttribute("class")) {
      divElement.removeAttribute("class");
  } else {
      divElement.className="open";
  }

  evt.preventDefault();   // cancel 
};

document.addEventListener("DOMContentLoaded", () => {
  // get the <a> tags
  const linkElements = faqs.querySelectorAll("#faqs a");
  
  // attach event handler for each <a> tag	    
  for (let linkElement of linkElements) {
      linkElement.addEventListener("click", toggle);
  }
      
});

// ---------- Service contact form ----------
const $ = selector => document.querySelector(selector); 

const displayErrorMsgs = msgs => {
    // create a new ul element
    const ul = document.createElement("ul");
    ul.classList.add("messages");

    // create a new li element for each error message, add to ul
    for (let msg of msgs) {
        const li = document.createElement("li");
        const text = document.createTextNode(msg);
        li.appendChild(text);
        ul.appendChild(li);
    }

    // if ul node isn't in document yet, add it
    const node = $("ul");
    if (node == null) {
        // get the form element 
        const form = $("form");

        // add ul to parent of form, before the form
        form.parentNode.insertBefore(ul, form);
    } else {
        // replace existing ul node
        node.parentNode.replaceChild(ul, node);
    }  
}

//contact form
const processEntries = () => {
    // get form controls
    const email = $("#email_address");
    const phone = $("#phone");
    const terms = $("#terms");
    const comments = $("#comments");

    //array for error messages
    const msgs = [];

    if (email.value == "") {
        msgs[msgs.length] = "Please enter an email address.";
    } 
    if (phone.value == "") {
        msgs[msgs.length] = "Please enter a mobile phone number."; 
    } 
    if (terms.checked == false) {
        msgs[msgs.length] = "You must agree to the terms of service."; 
    }
    if (comments.value == "") {
        msgs[msgs.length] = "Please enter a description.";
    }

    // submit the form or notify user of errors
    if (msgs.length == 0) {  // no error messages
        $("form").submit(); 
    } else {
        displayErrorMsgs(msgs);
    }
};

const resetForm = () => {
    $("form").reset();
    
    // remove error messages
    $("ul").remove();
    
    $("#email_address").focus();
};

document.addEventListener("DOMContentLoaded", () => {
    $("#register").addEventListener("click", processEntries);
    $("#reset_form").addEventListener("click", resetForm);  
    $("#email_address").focus();   
});




})()