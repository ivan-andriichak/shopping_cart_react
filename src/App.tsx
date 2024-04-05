import {Container} from "react-bootstrap";
import {Route, Routes} from "react-router-dom";
import React, {FC} from "react";

import {Home} from "./pages/Home";
import {Store} from "./pages/Store";
import {About} from "./pages/About";
import {Navbar} from "./components/Navbar"
import {ShoppingCartProvider} from "./context/ShoppingCartContext";

const App: FC = () => {
    return (
        <ShoppingCartProvider>
            <Navbar />
            <Container className="mb-4">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </Container>
        </ShoppingCartProvider>
    );
};

export {App};