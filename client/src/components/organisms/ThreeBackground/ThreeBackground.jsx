import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';

const ParticleSystem = (props) => {
    const ref = useRef();

    // Generate random points in a sphere
    const sphere = useMemo(() => {
        return random.inSphere(new Float32Array(4998), { radius: 1.5 });
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
                <PointMaterial
                    transparent
                    color={localStorage.getItem('theme') === 'dark' ? "#7c3aed" : "#000000"} // Purple in dark, Black in light
                    size={0.002}
                    sizeAttenuation={true}
                    depthWrite={false}
                />
            </Points>
        </group>
    );
}

const ThreeBackground = () => {
    return (
        <div className="fixed inset-0 z-[-1] opacity-60">
            <Canvas camera={{ position: [0, 0, 1] }}>
                <ParticleSystem />
            </Canvas>
        </div>
    );
};

export default ThreeBackground;
