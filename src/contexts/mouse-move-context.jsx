import { createContext, useCallback, useContext, useMemo, useState, useEffect } from 'react';
export const MouseMoveContext = createContext( {} );

export const MouseMoveProvider = ( { children } ) => {
    const [currentPosition, setCurrentPosition] = useState( { x: 0, y: 0 } );
    const whileMouseMove = useCallback( ( e ) => {
        setCurrentPosition( {
            x: e.clientX - window.innerWidth / 2,
            y: e.clientY - window.innerHeight / 2
        } );
    }, [] );

    const mouseDirection = useMemo( () => {
        return ( main = 20 ) => ( {
            x: currentPosition.x / main,
            y: currentPosition.y / main
        } )
    }, [currentPosition] );

    const mouseReverse = useMemo( () => {
        return ( main = 20 ) => ( {
            x: ( currentPosition.x / main ) * -1,
            y: ( currentPosition.y / main ) * -1
        } );
    }, [currentPosition] );

    useEffect( () => {
        window.addEventListener( 'mousemove', whileMouseMove );
        return () => {
            window.removeEventListener( 'mousemove', whileMouseMove );
        }
    }, [whileMouseMove] );

    const param = useMemo(
        () => ( {
            mouseDirection,
            mouseReverse
        } ),
        [mouseDirection, mouseReverse]
    );

    return (
        <MouseMoveContext.Provider value={ param }>
            { children }
        </MouseMoveContext.Provider>
    )
};

export const useMouseMoveUI = () => useContext( MouseMoveContext );