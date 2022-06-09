import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import PhoneList from "./pages/phoneList";
import AddPhone from "./pages/addPhone";
import UpdatePhone from "./pages/updatePhone";
import DeletePhone from "./pages/deletePhone";
import Page404 from "./pages/404";


export default function RoutesS() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<PhoneList />} />
      <Route path="add-phone" element={<AddPhone />} />
      <Route path="update-phone" element={<UpdatePhone />} />
      <Route path="delete-phone" element={<DeletePhone />} />
      <Route path="*" element={<Page404/> }
    />
    </Routes>
  </BrowserRouter>
  );
}