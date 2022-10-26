import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import $ from "jquery";

import { ReactNavbar } from "overlay-navbar";
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../../images/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faTachometer,
	faAddressBook,
	faCalendar,
	faClone,
	faChartBar,
	faCopy,
	faUser,
	faWarehouse,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
	function test() {
		var tabsNewAnim = $("#navbarSupportedContent");
		var selectorNewAnim = $("#navbarSupportedContent").find("li").length;
		var activeItemNewAnim = tabsNewAnim.find(".active");
		var activeWidthNewAnimHeight = activeItemNewAnim.innerHeight();
		var activeWidthNewAnimWidth = activeItemNewAnim.innerWidth();
		var itemPosNewAnimTop = activeItemNewAnim.position();
		var itemPosNewAnimLeft = activeItemNewAnim.position();
		$(".hori-selector").css({
			top: itemPosNewAnimTop.top + "px",
			left: itemPosNewAnimLeft.left + "px",
			height: activeWidthNewAnimHeight + "px",
			width: activeWidthNewAnimWidth + "px",
		});
		$("#navbarSupportedContent").on("click", "li", function (e) {
			$("#navbarSupportedContent ul li").removeClass("active");
			$(this).addClass("active");
			var activeWidthNewAnimHeight = $(this).innerHeight();
			var activeWidthNewAnimWidth = $(this).innerWidth();
			var itemPosNewAnimTop = $(this).position();
			var itemPosNewAnimLeft = $(this).position();
			$(".hori-selector").css({
				top: itemPosNewAnimTop.top + "px",
				left: itemPosNewAnimLeft.left + "px",
				height: activeWidthNewAnimHeight + "px",
				width: activeWidthNewAnimWidth + "px",
			});
		});
	}
	$(document).ready(function () {
		setTimeout(function () {
			test();
		});
	});
	$(window).on("resize", function () {
		setTimeout(function () {
			test();
		}, 500);
	});
	$(".navbar-toggler").click(function () {
		$(".navbar-collapse").slideToggle(300);
		setTimeout(function () {
			test();
		});
	});

	// --------------add active class-on another-page move----------
	$(document).ready(function ($) {
		// Get current path and find target link
		var path = window.location.pathname.split("/").pop();

		// Account for home page with empty path
		if (path == "") {
			path = "index.html";
		}

		var target = $('#navbarSupportedContent ul li a[href="' + path + '"]');
		// Add active class to target link
		target.parent().addClass("active");
	});

	return (
		<Fragment>
			<nav class="navbar navbar-expand-custom navbar-mainbg">
				<a class="navbar-brand navbar-logo" href="#">
					<img src={logo} className="img-fluid logo" />
				</a>
				<button
					class="navbar-toggler"
					type="button"
					aria-controls="navbarSupportedContent"
					aria-expanded="false"
					aria-label="Toggle navigation"
				>
					<i class="fas fa-bars text-white"></i>
				</button>
				<div
					class="collapse navbar-collapse justify-content-center"
					id="navbarSupportedContent"
				>
					<ul class="navbar-nav ml-auto">
						<div class="hori-selector">
							<div class="left"></div>
							<div class="right"></div>
						</div>
						<li class="nav-item active">
							<Link class="nav-link" to="/">
								<FontAwesomeIcon icon={faTachometer} />
								Dashboard
							</Link>
						</li>
						<li class="nav-item">
							<Link class="nav-link" to="/products">
								<FontAwesomeIcon icon={faWarehouse} />
								Products
							</Link>
						</li>
						<li class="nav-item">
							<Link class="nav-link" to="/account">
								<FontAwesomeIcon icon={faAddressBook} />
								Account
							</Link>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="javascript:void(0);">
								<FontAwesomeIcon icon={faCalendar} />
								Calendar
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="javascript:void(0);">
								<FontAwesomeIcon icon={faChartBar} />
								Charts
							</a>
						</li>
						<li class="nav-item">
							<a class="nav-link" href="javascript:void(0);">
								<FontAwesomeIcon icon={faCopy} />
								Documents
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</Fragment>
	);
};

export default Header;
