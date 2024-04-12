import React from "react";
import { PDFTemplate } from "./components/pdf-template";
import { Onedoc } from "@onedoc/client";
import { readFileSync, writeFileSync } from "fs";
import { compile } from "@onedoc/react-print";
import { join } from "path";

const ONEDOC_API_KEY = "1648376c-c809-4381-975d-91b4d517aac3"; // replace with your api key

(async () => {
  const onedoc = new Onedoc(ONEDOC_API_KEY);

  let doc = {
    html: await compile(<PDFTemplate name="Bruce Wayne" />),
    title: "Hello",
    test: true, // if true, produce a PDF in test mode with a Onedoc's watermark
    save: true, // if true, host the document and provide a download link in the console and your Onedoc's dashboard
    expiresIn: 30, // the number of day you want to host your document
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