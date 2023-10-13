
import React from 'react';
import { PlanesCollection } from '../api/planes.js';
import{ Marker } from 'react-map-gl';



export function AirplanePin({ longitude, latitude, name, _id, selected }) {
    let dialog = <div></div>

    if (selected) {
        dialog = <div style={{ "backgroundColor": "white", width: "200px", height: "100px" }}>
            <p> Long: {longitude}</p>
            <p> Lat: {latitude}</p>
            <p> Plane Name: {name} </p>
        </div>
    }
    return <div onClick={async () => {
        await PlanesCollection.updateAsync({ _id }, { $set: { selected: !selected } })
    }}><Marker longitude={longitude} latitude={latitude}  >
            <p>{name}</p>
            {dialog}
            <AirplaneSVG />
        </Marker>
    </div>
}

const AirplaneSVG = () => (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg"
        width="50.000000pt" height="50.000000pt" viewBox="0 0 1280.000000 724.000000"
        preserveAspectRatio="xMidYMid meet">
        <metadata>
            Created by potrace 1.15, written by Peter Selinger 2001-2017
        </metadata>
        <g transform="translate(0.000000,724.000000) scale(0.100000,-0.100000)"
            fill="#000000" stroke="none">
            <path d="M1200 7229 c-30 -4 -74 -15 -97 -23 -39 -14 -364 -251 -362 -265 0
  -3 776 -493 1723 -1089 l1724 -1083 367 -375 c202 -206 366 -376 364 -378 -2
  -2 -236 -47 -519 -101 -283 -53 -631 -119 -773 -146 -143 -27 -264 -49 -271
  -49 -7 0 -222 226 -479 502 -285 307 -491 520 -528 547 -75 54 -216 128 -262
  136 -35 7 -336 -40 -348 -53 -3 -4 14 -225 37 -492 24 -267 42 -492 41 -501
  -2 -18 3 -20 -832 376 -264 125 -507 236 -540 247 -135 44 -332 14 -407 -62
  -21 -21 -38 -46 -38 -57 0 -12 223 -228 641 -619 352 -329 655 -611 672 -626
  l32 -27 -39 -32 c-50 -42 -76 -99 -76 -171 0 -51 3 -59 30 -82 51 -42 195 -77
  365 -88 l40 -3 312 -415 c171 -228 322 -423 334 -432 32 -27 161 -25 235 3
  108 40 105 34 185 379 39 168 72 306 73 308 2 1 99 -5 217 -13 353 -24 765
  -35 1319 -35 687 0 980 12 1503 61 120 11 229 19 243 17 18 -2 155 -117 415
  -348 l388 -345 1 -947 c0 -522 2 -948 4 -948 2 0 104 9 226 20 241 22 298 36
  375 91 25 18 63 58 83 89 44 66 13 -1 730 1565 504 1100 581 1261 602 1267 14
  4 84 14 155 23 300 38 858 140 1295 236 1377 305 2214 666 2396 1033 36 74 39
  86 39 166 0 76 -3 92 -33 152 -62 126 -162 183 -482 277 -269 79 -291 87 -466
  170 -175 83 -233 98 -429 111 -294 20 -523 -21 -865 -155 -74 -29 -144 -55
  -155 -59 -11 -4 -114 -25 -230 -47 -115 -22 -363 -69 -550 -104 -1056 -199
  -1355 -255 -1373 -255 -11 0 -316 115 -678 256 -2365 919 -4352 1691 -5713
  2220 -505 196 -492 193 -621 173z"/>
        </g>
    </svg>
)