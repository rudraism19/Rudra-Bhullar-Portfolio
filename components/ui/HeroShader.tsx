'use client';

import React, { useEffect, useRef } from 'react';

export default function HeroShader() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const gl = canvas.getContext('webgl');
    if (!gl) return;

    // Vertex shader
    const vsSource = `
      attribute vec2 position;
      varying vec2 vUv;
      void main() {
        vUv = position * 0.5 + 0.5;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    // Fragment shader with organic 3D Simplex-style flow in exact editorial colors
    // #14120E (Dark Brown/Olive), #1D241F (Deep Forest Green), #EB7D00 (Tangerine), #F3EBD8 (Vanilla)
    const fsSource = `
      precision highp float;
      varying vec2 vUv;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform vec2 uMouse;

      // Color Palette constants - Option 1: Espresso Noir & Signal Tangerine
      const vec3 cBg      = vec3(0.078, 0.071, 0.055); // #14120E
      const vec3 cGreen   = vec3(0.114, 0.141, 0.122); // #1D241F
      const vec3 cOrange  = vec3(0.922, 0.490, 0.000); // #EB7D00
      const vec3 cVanilla = vec3(0.953, 0.922, 0.847); // #F3EBD8

      // Pseudo noise generator
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187,
                            0.366025403784439,
                           -0.577350269189626,
                            0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy) );
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1;
        i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
              + i.x + vec3(0.0, i1.x, 1.0 ));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m ;
        m = m*m ;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 st = gl_FragCoord.xy / uResolution.xy;
        st.x *= uResolution.x / uResolution.y;

        // Subtle mouse influence
        vec2 mouse = uMouse / uResolution.xy;
        mouse.x *= uResolution.x / uResolution.y;
        float distToMouse = distance(st, mouse);
        float mouseAttract = smoothstep(0.8, 0.0, distToMouse) * 0.15;

        float t = uTime * 0.12;

        // Layered smooth domain warping
        vec2 q = vec2(0.0);
        q.x = snoise(st + vec2(t * 0.4, t * 0.2));
        q.y = snoise(st + vec2(t * 0.15, -t * 0.3));

        vec2 r = vec2(0.0);
        r.x = snoise(st + 1.2 * q + vec2(1.7, 9.2) + 0.15 * t + mouseAttract);
        r.y = snoise(st + 1.2 * q + vec2(8.3, 2.8) + 0.126 * t);

        float f = snoise(st + 1.6 * r);

        // Map noise to the exact 4-color palette
        // Dark brown foundation
        vec3 color = cBg;

        // Secondary deep forest green flow
        float greenWeight = smoothstep(-0.35, 0.4, f);
        color = mix(color, cGreen, greenWeight * 0.85);

        // Highlight vanilla ribbons
        float vanillaWeight = smoothstep(0.3, 0.7, r.x * f);
        color = mix(color, cVanilla, vanillaWeight * 0.65);

        // Strategic Tangerine accent wisps (10% ratio)
        float orangeWeight = smoothstep(0.5, 0.85, snoise(st * 2.0 + r + t * 0.2));
        color = mix(color, cOrange, orangeWeight * 0.85);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Compile helper
    const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program));
      return;
    }

    // Geometry: Full-screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(program, 'position');
    const uTimeLoc = gl.getUniformLocation(program, 'uTime');
    const uResLoc = gl.getUniformLocation(program, 'uResolution');
    const uMouseLoc = gl.getUniformLocation(program, 'uMouse');

    let animationFrameId: number;
    let startTime = performance.now();
    let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isVisible = true;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = (e.clientX - rect.left) * (canvas.width / rect.width);
      mouse.targetY = (canvas.height - (e.clientY - rect.top) * (canvas.height / rect.height));
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    // ResizeObserver on canvas container to handle dynamic layout shifts
    const resizeObserver = new ResizeObserver(() => {
      resize();
    });
    resizeObserver.observe(canvas);

    // IntersectionObserver to pause rendering when scrolled out of view
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(canvas);

    const render = () => {
      if (isVisible) {
        resize();
        gl.viewport(0, 0, canvas.width, canvas.height);
        const currentTime = prefersReducedMotion ? 0 : (performance.now() - startTime) * 0.001;
        mouse.x += (mouse.targetX - mouse.x) * 0.05;
        mouse.y += (mouse.targetY - mouse.y) * 0.05;

        gl.useProgram(program);
        gl.enableVertexAttribArray(posLoc);
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

        gl.uniform1f(uTimeLoc, currentTime);
        gl.uniform2f(uResLoc, canvas.width, canvas.height);
        gl.uniform2f(uMouseLoc, mouse.x, mouse.y);

        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(animationFrameId);
    };

    const handleContextRestored = () => {
      render();
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      observer.disconnect();
      if (program) gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] lg:h-[520px] rounded-2xl overflow-hidden border border-[#2C2720] bg-[#14120E]">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
        aria-hidden="true"
      />
    </div>
  );
}
