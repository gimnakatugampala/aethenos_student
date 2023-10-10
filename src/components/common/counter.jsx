import { useState } from 'react';
import { InView } from 'react-intersection-observer';
import CountUp from 'react-countup';

const Counter = ( { number, text, add_style=true, decimal } ) => {
    const [focus, setFocus] = useState( false );
    const visibleChangeHandler = ( isVisible ) => {
        if ( isVisible ) {
            if ( ! focus ) {
                setFocus( true );
            }
        }
    }
    
    return (
        <>
            <CountUp 
                start={ focus ? 0 : null } 
                end={ number } 
                duration={ 3 } 
                decimals={ decimal ? decimal : null }
            >
                { ( { countUpRef } ) => (
                    <div className={`d-flex ${ add_style ? 'align-items-center justify-content-center' : '' }`}>
                        <span ref={countUpRef} />
                        <InView
                            as='span'
                            onChange={ ( inView ) =>
                                visibleChangeHandler( inView )
                            }
                        >
                            { text && <span>{ text }</span>}
                        </InView>
                    </div>
                ) }
            </CountUp>
        </>
    )
}

export default Counter;