import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import SearchPopup from '../../components/common/popup-modal/search-popup';
import PopUpSearch from "../../pages/search/PopUpSearch";
import OffCanvas from "../../components/common/sidebar/off-canvas";
import DropDownProfile from "../../components/profile/dropdwonProfile";
import useCartInfo from "../../hooks/use-cart-info";
import useSticky from "../../hooks/use-sticky";
import { wishlistItems } from "../../redux/features/wishlist-slice";
import HeaderTopLeft from "../headers/component/header-top-left";
import HeaderTopRight from "../headers/component/header-top-right";
import MainMenu from "../headers/component/main-menu";
import Cart from "./component/cart";
import Notification from "./component/notification";
import SearchBar from "../../pages/search/search-Bar";
import { GetCourseCategory, GetCategoriesMenu, IMG_HOST } from "../../api";
import "bootstrap-icons/font/bootstrap-icons.css";
import SmallRedLoading from "../../functions/Loading/SmallRedLoading";
import Cookies from "js-cookie";

import {
  Menu,
  MenuItem,
  MenuButton,
  SubMenu,
  MenuHeader,
} from "@szhsin/react-menu";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

import { useRouter } from "next/router";

import OneLineSkeleton from "../../functions/Skeletons/OneLineSkeleton";
import "@szhsin/react-menu/dist/index.css";
import { GetNotifications } from "../../api";

const categories = [
  { link: "/courses/design", title: "Design" },
  { link: "/courses/it-software", title: "IT & Software" },
  { link: "/courses/development", title: "Development" },
  { link: "/courses/architecture", title: "Architecture" },
  { link: "/courses/life-style", title: "Life Style" },
  { link: "/courses/data-science", title: "Data Science" },
  { link: "/courses/marketing", title: "Marketing" },
  { link: "/courses/music", title: "Music" },
  { link: "/courses/photography", title: "Photography" },
  { link: "/courses/business", title: "Finance" },
  { link: "/courses/motivation", title: "Motivation" },
];

const Header = ({
  header_style,
  no_top_bar,
  disable_full_width,
  disable_category,
}) => {
  // let  activeUser = false;
  const { sticky } = useSticky();
  const { quantity } = useCartInfo();
  const wishlists = useSelector(wishlistItems);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const [isUserLoading, setisUserLoading] = useState(true);
  const [CURRENTUSER, setCURRENTUSER] = useState(Cookies.get("aethenos"));

  const [categories, setcategories] = useState([]);
  const [navbar_list, setnavbar_list] = useState([]);

  const [showDropdown, setShowDropdown] = useState(false);

  const [searchResults, setsearchResults] = useState(null);

  const router = useRouter();

  const [notifications, setNotifications] = useState(null);

  useEffect(() => {
    if (CURRENTUSER) {
      GetNotifications(setNotifications);
    }
  }, [CURRENTUSER]);

  useEffect(() => {
    setTimeout(() => {
      setisUserLoading(false);
    }, 1500);

    // Get Categories
    GetCourseCategory(setcategories);
    GetCategoriesMenu(setnavbar_list);
  }, [categories]);

  return (
    <>
      <header
        style={{ zoom: "0.9" }}
        className={`edu-header header-style-${
          header_style ? header_style : "1"
        } ${
          disable_full_width ? "disbale-header-fullwidth" : "header-fullwidth"
        } ${no_top_bar ? "no-topbar" : ""}`}
      >
        {!no_top_bar && (
          <div className="header-top-bar">
            <div className="container-fluid">
              {/* <div className="header-top" style={{height:40}}>
                                <div className="header-top-left">
                                    <HeaderTopLeft />
                                </div>
                                <div className="header-top-right">
                                    <HeaderTopRight />
                                </div>
                            </div> */}
            </div>
          </div>
        )}
        <div id="edu-sticky-placeholder"></div>
        <div className={`header-mainmenu ${sticky ? "edu-sticky" : ""}`}>
          <div className="container-fluid">
            <div className="header-navbar">
              <div className="header-brand">
                <div className="logo">
                  <Link href={"/"} legacyBehavior>
                    <a>
                      <img
                        width={200}
                        height={100}
                        className="logo-light"
                        src="/assets/images/logo/Header_Athenos_logo.png"
                        alt="logo"
                      />
                      <img
                         width={200}
                         height={100}
                        className="logo-dark"
                        src="/assets/images/logo/Header_Athenos_logo.png"
                        alt="logo"
                      />
                    </a>
                  </Link>
                </div>

                {!disable_category && (
                  <div className="header-category">
                    <nav className="mainmenu-nav">
                      <ul className="mainmenu">
                        <li style={{cursor:'pointer'}} className="has-droupdown">
                          <Menu
                          
                            menuButton={
                              <a style={{fontSize: "18px"}}>
                                <i className="icon-1"></i>Categories
                              </a>
                            }
                          >
                            {navbar_list.length == 0 && (
                              <div className="container">
                                <OneLineSkeleton height={20} />
                                <OneLineSkeleton height={20} />
                                <OneLineSkeleton height={20} />
                                <OneLineSkeleton height={20} />
                                <OneLineSkeleton height={20} />
                                <OneLineSkeleton height={20} />
                                <OneLineSkeleton height={20} />
                                <OneLineSkeleton height={20} />
                                <OneLineSkeleton height={20} />
                                <OneLineSkeleton height={20} />
                                <OneLineSkeleton height={20} />
                                <OneLineSkeleton height={20} />
                              </div>
                            )}

                            {navbar_list != null &&
                              navbar_list.map((list, index) => (
                                <a
                                  style={{ display: "block" }}
                                  href={`/courses/${list.categoryLinkName}`}
                                  key={index}
                                >
                                  <SubMenu label={list.category}>
                                    {list.subCategoryList.map((sub_list, i) => (
                                      <a
                                        style={{ display: "block" }}
                                        key={i}
                                        href={`/courses/${list.categoryLinkName}/${sub_list.subCategoryLinkName}`}
                                      >
                                        <SubMenu label={sub_list.subCategory}>
                                          <MenuHeader>
                                            <b>Popular Topics</b>
                                          </MenuHeader>
                                          {sub_list.topics.map((topic, id) => (
                                            <a
                                              href={`/topic/${topic.topicLinkName}`}
                                              style={{ display: "block" }}
                                              key={id}
                                            >
                                              <MenuItem>{topic.topic}</MenuItem>
                                            </a>
                                          ))}
                                        </SubMenu>
                                      </a>
                                    ))}
                                  </SubMenu>
                                </a>
                              ))}
                          </Menu>
                        </li>
                      </ul>
                    </nav>
                  </div>
                )}
              </div>
              <div className="header-mainnav">
                <nav className="mainmenu-nav">
                  <MainMenu />
                </nav>
              </div>
              <div className="header-right">
                <ul className="header-action">
                  <li className="search-bar">
                    <div className="input-group">
                      <SearchBar
                        showDropdown={showDropdown}
                        setShowDropdown={setShowDropdown}
                        setsearchResults={setsearchResults}
                      />
                    </div>
                  </li>
                  
                  <li className="icon search-icon search-bar" style={{ position: "relative" }}>
                  <SearchBar
                    setsearchResults={setsearchResults}
                    showDropdown={showDropdown}
                    setShowDropdown={setShowDropdown}
                  />

                  {showDropdown && searchResults != null && (
                    <List
                      className="wrapper"
                      sx={{
                        position: "absolute",
                        top: "100%",
                        left: 0,
                        width: "450px",
                        bgcolor: "background.paper",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                        borderRadius: "4px",
                        overflowY: "auto",
                        overflowX:'hidden',
                        maxHeight: "300px",
                        zIndex: 1,
                      }}
                    >
                      {searchResults.length > 0 ? (
                        searchResults.map((result, index) =>
                          result.searchType === "course" ? (

                            // If Courses Found
                            <React.Fragment
                            onClick={() => {
                              window.location.href = `/course-details/${result.courseCode}`;
                              router.push(`/course-details/${result.courseCode}`);
                            }}
                            key={index}>
                              <a
                                onClick={() => {
                                  window.location.href = `/course-details/${result.courseCode}`;
                                  router.push(`/course-details/${result.courseCode}`);
                                }}
                                href={`/course-details/${result.courseCode}`}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                  display: "block",
                                }}
                              >
                                <ListItem
                                className="m-0"
                                  onClick={() => {
                                    window.location.href = `/course-details/${result.courseCode}`;
                                    router.push(`/course-details/${result.courseCode}`);
                                  }}
                                  sx={{
                                    cursor: "pointer",
                                    alignItems: "flex-start",
                                    padding: "15px 15px",
                                    '&:hover': { bgcolor: "rgba(0, 0, 0, 0.04)" },
                                    width: "100%",
                                  }}
                                >
                                  <ListItemAvatar   
                                  loading="lazy" 
                                  alt={result.courseTitle} 
                                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                    >
                                    <Avatar src={`${IMG_HOST}${result.courseImg}`} />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      <b>
                                        <Typography
                                          variant="body1"
                                          sx={{ fontSize: "14px" }}
                                        >
                                          {result.courseTitle}
                                        </Typography>
                                      </b>
                                    }
                                    secondary={`Instructor: ${result.instructorName}`}
                                    sx={{ marginLeft: "10px" }}
                                  />
                                </ListItem>
                                <Divider />
                              </a>
                            </React.Fragment>
                          ) : (
                            // Instructors  Found
                            <React.Fragment   
                            onClick={() => {
                              window.location.href = `/users/${result.instructorCode}`;
                              router.push(`/users/${result.instructorCode}`);
                            }} 
                            key={index}>
                              <a
                                onClick={() => {
                                  window.location.href = `/users/${result.instructorCode}`;
                                  router.push(`/users/${result.instructorCode}`);
                                }}
                                href={`/users/${result.instructorCode}`}
                                style={{
                                  textDecoration: "none",
                                  color: "inherit",
                                  display: "block",
                                }}
                              >
                                <ListItem
                                  onClick={() => {
                                    window.location.href = `/users/${result.instructorCode}`;
                                    router.push(`/users/${result.instructorCode}`);
                                  }}
                                  sx={{
                                    cursor: "pointer",
                                    alignItems: "flex-start",
                                    padding: "10px 15px",
                                    '&:hover': { bgcolor: "rgba(0, 0, 0, 0.04)" },
                                    width: "100%",
                                  }}
                                >
                                  <ListItemAvatar
                                  loading="lazy" 
                                  alt={result.instructorName} 
                                  style={{ width: '40px', height: '40px', borderRadius: '50%' }}
                                  >
                                    <Avatar src={result.instructorImg} />
                                  </ListItemAvatar>
                                  <ListItemText
                                    primary={
                                      <b>
                                        <Typography
                                          variant="body1"
                                          sx={{ fontSize: "14px" }}
                                        >
                                          {result.instructorName}
                                        </Typography>
                                      </b>
                                    }
                                    secondary={"Instructor"}
                                    sx={{ marginLeft: "10px" }}
                                  />
                                </ListItem>
                                <Divider />
                              </a>
                            </React.Fragment>
                          )
                        )
                      ) : (
                        // Items Not Found
                        <ListItem
                          sx={{
                            cursor: "pointer",
                            alignItems: "center",
                            padding: "20px",
                            textAlign: "center",
                            width: "100%",
                          }}
                        >
                          <ListItemText
                            primary={
                              <b className="text-center">
                                <Typography variant="body1">
                                  No Results Found
                                </Typography>
                              </b>
                            }
                          />
                        </ListItem>
                      )}
                    </List>
                  )}
                </li>



                  <li className="icon cart-icon mx-3">
                    <Link href="/wishlist" legacyBehavior>
                      <a className="cart-icon">
                        <i className="icon-22 fs-4" ></i>
                        <span className="count">{wishlists?.length}</span>
                      </a>
                    </Link>
                  </li>
                  <li className="icon cart-icon mx-3">
                    <Link href="/cart" legacyBehavior>
                      <a className="cart-icon">
                        <i className="icon-3 fs-4"></i>
                        <span className="count">{quantity}</span>
                      </a>
                    </Link>
                    <Cart />
                  </li>

                  {/* A Loading */}
                  {isUserLoading ? (
                    <SmallRedLoading />
                  ) : (
                    <>
                      {CURRENTUSER == null ? (
                        <>
                          <li className="header-info mx-3">
                            <Link href="/login" legacyBehavior>
                              <a className="edu-btn btn-small fs-6 fw-bold">Log in</a>
                            </Link>
                          </li>

                          <li className="header-info m-3 ">
                            <Link href="/signup" legacyBehavior>
                              <a className="edu-btn btn-small fs-6 fw-bold">Sign up</a>
                            </Link>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="icon cart-icon mx-3">
                            <Link href="/cart" legacyBehavior>
                              <a className="cart-icon">
                                <i class="bi bi-bell fs-4"></i>
                                <span className="count">
                                {(notifications && notifications.length > 0
                                ? notifications.filter(notification => !notification.isRead).length
                                : 0
                              )}

                                </span>
                              </a>
                            </Link>
                            <Notification />
                          </li>

                          <li>
                            <DropDownProfile
                              setOpenProfile={setOpenProfile}
                              setisUserLoading={setisUserLoading}
                              setCURRENTUSER={setCURRENTUSER}
                            />
                          </li>
                        </>
                      )}
                    </>
                  )}

                  <li className="mobile-menu-bar d-block d-xl-none">
                    <button
                      className="hamberger-button"
                      onClick={() => setIsOpen(true)}
                    >
                      <i className="icon-54"></i>
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Start Search Popup  --> */}
        <PopUpSearch
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={setIsSearchOpen}
        />
        {/* <!-- End Search Popup  --> */}
      </header>

      {/* sidebar start */}
      <OffCanvas isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* sidebar end */}
    </>
  );
};

export default Header;
