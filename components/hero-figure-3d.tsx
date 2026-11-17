// @ts-nocheck
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const palette = ["#7dd3fc","#cbd5e1","#00ff66","#f59e0b","#86efac","#fb7185","#a3e635"];

export function HeroFigure3D({ theme=6, className="" }: {theme?:number;className?:string}) {
  const host=useRef<HTMLDivElement>(null);
  useEffect(()=>{
    const node=host.current;if(!node)return;
    let renderer:THREE.WebGLRenderer;
    try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true});}catch{return;}
    renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,1.7));
    renderer.setSize(node.clientWidth,node.clientHeight);
    renderer.outputColorSpace=THREE.SRGBColorSpace;
    node.appendChild(renderer.domElement);
    const scene=new THREE.Scene();
    const camera=new THREE.PerspectiveCamera(34,node.clientWidth/node.clientHeight,.1,100);
    camera.position.set(0,0,7.4);
    const group=new THREE.Group();scene.add(group);
    const color=new THREE.Color(palette[theme%palette.length]);
    scene.add(new THREE.AmbientLight(0xb8d8c5,1.7));
    const key=new THREE.PointLight(color,32,18);key.position.set(3,3,4);scene.add(key);
    const rim=new THREE.PointLight(0x00ff66,15,14);rim.position.set(-3,1,-2);scene.add(rim);
    const metal=new THREE.MeshStandardMaterial({color:0x34443b,metalness:.88,roughness:.24});
    const dark=new THREE.MeshStandardMaterial({color:0x080e0b,metalness:.8,roughness:.3});
    const accent=new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:2.4,metalness:.45,roughness:.22});
    const gold=new THREE.MeshStandardMaterial({color:0xb6a06b,metalness:.9,roughness:.22});
    const add=(geometry:THREE.BufferGeometry,material:THREE.Material,x:number,y:number,z:number,sx=1,sy=1,sz=1)=>{
      const m=new THREE.Mesh(geometry,material);m.position.set(x,y,z);m.scale.set(sx,sy,sz);m.castShadow=true;group.add(m);return m;
    };
    // Original low-poly armored sentinel, built from Three.js geometry.
    add(new THREE.IcosahedronGeometry(1.05,1),metal,0,.7,0,1,.98,.78);
    add(new THREE.ConeGeometry(.17,.45,5),gold,0,1.88,0);
    add(new THREE.BoxGeometry(1.55,.2,.82),dark,0,.28,0);
    add(new THREE.BoxGeometry(.12,.12,.12),gold,-.7,.33,.45);
    add(new THREE.BoxGeometry(.12,.12,.12),gold,.7,.33,.45);
    const visor=add(new THREE.BoxGeometry(1.22,.12,.1),accent,0,.78,.77);
    visor.rotation.z=-.03;
    add(new THREE.ConeGeometry(.18,.5,4),gold,0,-.05,.5,1,1,1);
    const shoulderGeo=new THREE.IcosahedronGeometry(.55,1);
    const left=add(shoulderGeo,metal,-1.05,-.25,0,1.15,.8,.9);
    const right=add(shoulderGeo,metal,1.05,-.25,0,1.15,.8,.9);
    left.rotation.z=.3;right.rotation.z=-.3;
    add(new THREE.CylinderGeometry(.56,.72,1.15,8),dark,0,-.95,0,1,1,1);
    add(new THREE.TorusGeometry(1.65,.012,4,96),gold,0,.4,-.1,1,1,.8).rotation.x=Math.PI/2.7;
    const orbit=add(new THREE.TorusGeometry(2.05,.008,4,96),accent,0,.2,-.4,1,1,.75);orbit.rotation.x=Math.PI/2.2;orbit.rotation.y=.4;
    const clock=new THREE.Clock();let raf=0;
    const resize=()=>{if(!host.current)return;const w=host.current.clientWidth,h=host.current.clientHeight;renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();};
    const observer=new ResizeObserver(resize);observer.observe(node);
    const animate=()=>{const t=clock.getElapsedTime();group.rotation.y=Math.sin(t*.35)*.24;group.position.y=Math.sin(t*1.15)*.1;orbit.rotation.z=t*.32;renderer.render(scene,camera);raf=requestAnimationFrame(animate);};
    animate();
    return()=>{cancelAnimationFrame(raf);observer.disconnect();scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.dispose();const mats=Array.isArray(o.material)?o.material:[o.material];mats.forEach(m=>m.dispose());}});renderer.dispose();renderer.domElement.remove();};
  },[theme]);
  return <div ref={host} className={className} aria-label="Animated 3D armored hero character" role="img"/>;
}
