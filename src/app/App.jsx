import React, { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Header from "../components/Header.jsx";
import "./app.css";

const HomePage = lazy(() => import("../pages/HomePage.jsx"));
const ProductsPage = lazy(() => import("../pages/ProductsPage.jsx"));

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <Suspense fallback={<PageLoading />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/projects/:projectId" element={<ProductsPage />} />
          <Route path="/products.html" element={<Navigate to="/products" replace />} />
          <Route
            path="/next-station.html"
            element={<Navigate to="/projects/next-station" replace />}
          />
          <Route
            path="/zaroorat.html"
            element={<Navigate to="/projects/zaroorat" replace />}
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

function PageLoading() {
  return <main className="page-loading" aria-busy="true" aria-label="Loading page" />;
}
