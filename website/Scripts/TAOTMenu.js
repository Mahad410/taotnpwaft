jQuery(document).ready(function ($) {

  var ResponsiveMenu = {
    trigger: "#responsive-menu-button",
    animationSpeed: 500,
    breakpoint: 1200,
    pushButton: "off",
    animationType: "slide",
    animationSide: "left",
    pageWrapper: "",
    isOpen: false,
    triggerTypes: "click",
    activeClass: "is-active",
    container: "#responsive-menu-container",
    openClass: "responsive-menu-open",
    accordion: "off",
    activeArrow: "▲",
    inactiveArrow: "▼",
    wrapper: "#responsive-menu-wrapper",
    closeOnBodyClick: "off",
    closeOnLinkClick: "off",
    itemTriggerSubMenu: "off",
    linkElement: ".responsive-menu-item-link",
    subMenuTransitionTime: 200,
    openMenu: function () {
      $(this.trigger).addClass(this.activeClass);
      $("html").addClass(this.openClass);
      $(".responsive-menu-button-icon-active").hide();
      $(".responsive-menu-button-icon-inactive").show();
      this.setButtonTextOpen();
      this.setWrapperTranslate();
      this.isOpen = true;
    },
    closeMenu: function () {
      $(this.trigger).removeClass(this.activeClass);
      $("html").removeClass(this.openClass);
      $(".responsive-menu-button-icon-inactive").hide();
      $(".responsive-menu-button-icon-active").show();
      this.setButtonText();
      this.clearWrapperTranslate();
      this.isOpen = false;
    },
    setButtonText: function () {
      if ($(".responsive-menu-button-text-open").length > 0 && $(".responsive-menu-button-text").length > 0) {
        $(".responsive-menu-button-text-open").hide();
        $(".responsive-menu-button-text").show();
      }
    },
    setButtonTextOpen: function () {
      if ($(".responsive-menu-button-text").length > 0 && $(".responsive-menu-button-text-open").length > 0) {
        $(".responsive-menu-button-text").hide();
        $(".responsive-menu-button-text-open").show();
      }
    },
    triggerMenu: function () {
      this.isOpen ? this.closeMenu() : this.openMenu();
    },
    triggerSubArrow: function (subarrow) {
      var sub_menu = $(subarrow).parent().siblings(".responsive-menu-submenu");
      var self = this;
      if (this.accordion == "on") {
        /* Get Top Most Parent and the siblings */
        var top_siblings = sub_menu.parents(".responsive-menu-item-has-children").last().siblings(".responsive-menu-item-has-children");
        var first_siblings = sub_menu.parents(".responsive-menu-item-has-children").first().siblings(".responsive-menu-item-has-children");
        /* Close up just the top level parents to key the rest as it was */
        top_siblings.children(".responsive-menu-submenu").slideUp(self.subMenuTransitionTime, "linear").removeClass("responsive-menu-submenu-open");
        /* Set each parent arrow to inactive */
        top_siblings.each(function () {
          $(this).find(".responsive-menu-subarrow").first().html(self.inactiveArrow);
          $(this).find(".responsive-menu-subarrow").first().removeClass("responsive-menu-subarrow-active");
        });
        /* Now Repeat for the current item siblings */
        first_siblings.children(".responsive-menu-submenu").slideUp(self.subMenuTransitionTime, "linear").removeClass("responsive-menu-submenu-open");
        first_siblings.each(function () {
          $(this).find(".responsive-menu-subarrow").first().html(self.inactiveArrow);
          $(this).find(".responsive-menu-subarrow").first().removeClass("responsive-menu-subarrow-active");
        });
      }
      if (sub_menu.hasClass("responsive-menu-submenu-open")) {
        sub_menu.slideUp(self.subMenuTransitionTime, "linear").removeClass("responsive-menu-submenu-open");
        $(subarrow).html(this.inactiveArrow);
        $(subarrow).removeClass("responsive-menu-subarrow-active");
      } else {
        sub_menu.slideDown(self.subMenuTransitionTime, "linear").addClass("responsive-menu-submenu-open");
        $(subarrow).html(this.activeArrow);
        $(subarrow).addClass("responsive-menu-subarrow-active");
      }
    },
    menuHeight: function () {
      return $(this.container).height();
    },
    menuWidth: function () {
      return $(this.container).width();
    },
    wrapperHeight: function () {
      return $(this.wrapper).height();
    },
    setWrapperTranslate: function () {
      switch (this.animationSide) {
        case "left":
          translate = "translateX(" + this.menuWidth() + "px)"; break;
        case "right":
          translate = "translateX(-" + this.menuWidth() + "px)"; break;
        case "top":
          translate = "translateY(" + this.wrapperHeight() + "px)"; break;
        case "bottom":
          translate = "translateY(-" + this.menuHeight() + "px)"; break;
      }
      if (this.animationType == "push") {
        $(this.pageWrapper).css({ "transform": translate });
        $("html, body").css("overflow-x", "hidden");
      }
      if (this.pushButton == "on") {
        $("#responsive-menu-button").css({ "transform": translate });
      }
    },
    clearWrapperTranslate: function () {
      var self = this;
      if (this.animationType == "push") {
        $(this.pageWrapper).css({ "transform": "" });
        setTimeout(function () {
          $("html, body").css("overflow-x", "");
        }, self.animationSpeed);
      }
      if (this.pushButton == "on") {
        $("#responsive-menu-button").css({ "transform": "" });
      }
    },
    init: function () {
      var self = this;
      $(this.trigger).on(this.triggerTypes, function (e) {
        e.stopPropagation();
        self.triggerMenu();
      });
      $(this.trigger).mouseup(function () {
        $(self.trigger).blur();
      });
      $(".responsive-menu-subarrow").on("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
        self.triggerSubArrow(this);
      });
      $(window).resize(function () {
        if ($(window).width() > self.breakpoint) {
          if (self.isOpen) {
            self.closeMenu();
          }
        } else {
          if ($(".responsive-menu-open").length > 0) {
            self.setWrapperTranslate();
          }
        }
      });
      if (this.closeOnLinkClick == "on") {
        $(this.linkElement).on("click", function (e) {
          e.preventDefault();
          /* Fix for when close menu on parent clicks is on */
          if (self.itemTriggerSubMenu == "on" && $(this).is(".responsive-menu-item-has-children > " + self.linkElement)) {
            return;
          }
          old_href = $(this).attr("href");
          old_target = typeof $(this).attr("target") == "undefined" ? "_self" : $(this).attr("target");
          if (self.isOpen) {
            if ($(e.target).closest(".responsive-menu-subarrow").length) {
              return;
            }
            self.closeMenu();
            setTimeout(function () {
              window.open(old_href, old_target);
            }, self.animationSpeed);
          }
        });
      }
      if (this.closeOnBodyClick == "on") {
        $(document).on("click", "body", function (e) {
          if (self.isOpen) {
            if ($(e.target).closest("#responsive-menu-container").length || $(e.target).closest("#responsive-menu-button").length) {
              return;
            }
          }
          self.closeMenu();
        });
      }
      if (this.itemTriggerSubMenu == "on") {
        $(".responsive-menu-item-has-children > " + this.linkElement).on("click", function (e) {
          e.preventDefault();
          self.triggerSubArrow($(this).children(".responsive-menu-subarrow").first());
        });
      }

      if (jQuery("#responsive-menu-button").css("display") != "none") {
        $("#responsive-menu-button,#responsive-menu a.responsive-menu-item-link, #responsive-menu-wrapper input").focus(function () {
          $(this).addClass("is-active");
          $("html").addClass("responsive-menu-open");
          $("#responsive-menu li").css({ "opacity": "1", "margin-left": "0" });
        });

        $("#responsive-menu-button, a.responsive-menu-item-link,#responsive-menu-wrapper input").focusout(function () {
          if ($(this).last("#responsive-menu-button a.responsive-menu-item-link")) {
            $(this).removeClass("is-active");
            $("html").removeClass("responsive-menu-open");
          }
        });
      }

      $("#responsive-menu a.responsive-menu-item-link").keydown(function (event) {
        console.log(event.keyCode);
        if ([13, 27, 32, 35, 36, 37, 38, 39, 40].indexOf(event.keyCode) == -1) {
          return;
        }
        var link = $(this);
        switch (event.keyCode) {
          case 13:
            link.click();
            break;
          case 27:
            var dropdown = link.parent("li").parents(".responsive-menu-submenu");
            if (dropdown.length > 0) {
              dropdown.hide();
              dropdown.prev().focus();
            }
            break;

          case 32:
            var dropdown = link.parent("li").find(".responsive-menu-submenu");
            if (dropdown.length > 0) {
              dropdown.show();
              dropdown.find("a, input, button, textarea").first().focus();
            }
            break;

          case 35:
            var dropdown = link.parent("li").find(".responsive-menu-submenu");
            if (dropdown.length > 0) {
              dropdown.hide();
            }
            $(this).parents("#responsive-menu").find("a.responsive-menu-item-link").filter(":visible").last().focus();
            break;
          case 36:
            var dropdown = link.parent("li").find(".responsive-menu-submenu");
            if (dropdown.length > 0) {
              dropdown.hide();
            }
            $(this).parents("#responsive-menu").find("a.responsive-menu-item-link").filter(":visible").first().focus();
            break;
          case 37:
          case 38:
            event.preventDefault();
            event.stopPropagation();
            if (link.parent("li").prevAll("li").filter(":visible").first().length == 0) {
              link.parent("li").nextAll("li").filter(":visible").last().find("a").first().focus();
            } else {
              link.parent("li").prevAll("li").filter(":visible").first().find("a").first().focus();
            }
            break;
          case 39:
          case 40:
            event.preventDefault();
            event.stopPropagation();
            if (link.parent("li").nextAll("li").filter(":visible").first().length == 0) {
              link.parent("li").prevAll("li").filter(":visible").last().find("a").first().focus();
            } else {
              link.parent("li").nextAll("li").filter(":visible").first().find("a").first().focus();
            }
            break;
        }
      });
    }
  };
  ResponsiveMenu.init();
});