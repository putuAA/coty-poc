"use client";
import React from "react";

import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// If you want you can use SCSS instead of css
import "lightgallery/scss/lightgallery.scss";
import "lightgallery/scss/lg-zoom.scss";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";

import Image from "next/image";

const onInit = () => {
  console.log("lightGallery has been initialized");
};

export default function ImageGallery({ imageColl }) {
  return (
    <LightGallery
      onInit={onInit}
      speed={500}
      plugins={[lgThumbnail, lgZoom]}
      elementClassNames="flex flex-row justify-center p-3 m-3 gap-3"
    >
      {imageColl.map((image, i) => (
        <a key={i} href={image.node.url} target="_blank">
          <Image
            src={image.node.url}
            alt={image.node.altText}
            height={100}
            width={100}
            className="flex"
          />
        </a>
      ))}
    </LightGallery>
  );
}
