/**
=========================================================
* Material Kit 2 React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-kit-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

/**
  All of the routes for the Material Kit 2 React React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Navbar.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `name` key is used for the name of the route on the Navbar.
  2. The `icon` key is used for the icon of the route on the Navbar.
  3. The `collapse` key is used for making a collapsible item on the Navbar that contains other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  4. The `route` key is used to store the route location which is used for the react router.
  5. The `href` key is used to store the external links location.
  6. The `component` key is used to store the component of its route.
  7. The `dropdown` key is used to define that the item should open a dropdown for its collapse items .
  8. The `description` key is used to define the description of
          a route under its name.
  9. The `columns` key is used to define that how the content should look inside the dropdown menu as columns,
          you can set the columns amount based on this key.
  10. The `rowsPerColumn` key is used to define that how many rows should be in a column.
*/

// @mui material components
import Icon from "@mui/material/Icon";

// website components
import Registration from "./componentsInUse/registration/Registration";
import Login from "./componentsInUse/login/Login";
import Cockpit from "./componentsInUse/userPage/cockpit";
import useAuth from "./hooks/useAuth";
import RegistrationBasic from "./componentsInUse/registration";


function Routes(){

    let userRoutes = []
    const auth = useAuth()
    const obj = auth[Object.keys(auth)[0]]
  console.log(obj)
    const objArr = Object.values(obj)
    if (Object.values(obj).length === 0) {
      userRoutes =
        {
          name: "Konto",
          collapse: [
            {
              name: "Logowanie",
              route: "/login",
              component: <Login/>
            },
            {
              name: "Rejestracja",
              route: "/register",
              component: <RegistrationBasic/>
            },
          ],
        }

    }

    else {
      userRoutes =
        {
          name: "Konto",
          collapse: [
            {
              name : `Zalogowany jako: ${objArr[0]}`
            },
            {
              name: "Kokpit",
              description: `Zalogowany jako ${objArr[0]}`,
              route: "/userpanel",
              component: <Cockpit/>
            },
            {
              name: "Wyloguj",
              route: "/logout",
              component: <Login/>
            }
          ],
        }
    }


  return [
    {
      name: "Użytkownik",
      icon: <Icon>account_circle</Icon>,
      columns: 1,
      rowsPerColumn: 3,
      collapse: [userRoutes]
    },
    {
      name: "Informacje",
      icon: <Icon>help</Icon>,
      collapse: [
        {
          name: "O nas",
          href: "/#o_nas",

        },
        {
          name: "Usługi",
          href: "/#uslugi",
        },
        {
          name: "Oferta",
          href: "/#oferta",
        },
        {
          name: "Cennik",
          href: "/#cennik"
        },
        {
          name: "Dodaj spółkę",
          href: "/add-company",
        },
        {
          name: "FAQ",
          route: "/faq",
        },
        {
          name: "Regulamin",
          route: "/statute",
        },
      ],
    },
  ];
}


export default Routes
