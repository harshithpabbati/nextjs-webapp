import React from "react";
import Head from 'next/head';
import { string } from 'prop-types';

const Header = (props) => (
    <Head>
        <meta charSet="UTF-8" />
        <title>{props.title} | amFOSS CMS</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={props.description} />
        <meta name="keywords" content={props.keywords} />
    </Head>
);

Head.propTypes = {
    title: string,
    description: string,
    keywords: string,
    url: string,
    ogImage: string
};

export default Header