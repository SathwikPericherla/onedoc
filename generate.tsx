import React from "react";
import { PDFTemplate } from "./components/pdf-template";
import { Onedoc } from "@onedoc/client";
import { readFileSync, writeFileSync } from "fs";
import { compile } from "@onedoc/react-print";
import { join } from "path";

const ONEDOC_API_KEY = "393d95e7-32d8-4d6c-bd45-7ff6cff049f5"; // Replace this with your actual API key

(async () => {
  const onedoc = new Onedoc(ONEDOC_API_KEY);

  let doc = {
    html: await compile(<PDFTemplate name="Sathwik Pericherla" />),
    title: "Hello",
    test: true, // Set to true to produce a PDF in test mode with Onedoc's watermark
    save: true, // Set to true to host the document and provide a download link in the console and your Onedoc's dashboard
    expiresIn: 30, // Number of days to host your document
    assets: [
      {
        path: "./stylesheet.css",
        content: readFileSync(join(process.cwd(), "stylesheet.css")).toString(),
      },
    ],
  };

  const { file, link, error, info } = await onedoc.render(doc);

  if (error) {
    throw error;
  }

  console.log(link);
})();