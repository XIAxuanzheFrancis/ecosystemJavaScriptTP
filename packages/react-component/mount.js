import { createRoot } from 'react-dom/client';

import { Fragment } from "react";

import {
    BrowserRouter,
    Route,
    Routes,
    Link
  } from "react-router-dom";
import AddSong from './addSong.js';
import DeleteSong from './deleteSong.js';
import UpdateSong from '/updateSong.js';
import Component from './index.js'

const Default = () => {
    return (<Fragment>
        <h1>Index</h1>
        <div><Link to={ `/${SUBJECT}/` }>{SUBJECT}</Link></div>
    </Fragment>)
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
    <BrowserRouter>
        <Routes>
            <Route exact path="/home" element={<Default />} />
            <Route path={`/${SUBJECT}`} element={<Component a="toto"/>} />
            <Route exact path="/addSong" element={<AddSong />} >Add Song</Route>
            <Route exact path="/deleteSong" element={<DeleteSong />} >Delete Song</Route>
            <Route exact path="/updateSong" element={<UpdateSong />} >Update Song</Route>
        </Routes>
    </BrowserRouter>
);
