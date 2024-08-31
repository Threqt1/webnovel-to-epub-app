import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";

const root = createRoot(document.body);
root.render(
    <React.StrictMode>
        <ChakraProvider>
            <div className="w-screen h-screen">
                <App />
            </div>
        </ChakraProvider>
    </React.StrictMode>
);
