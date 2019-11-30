import React, { useRef, useState } from 'react';
import { useStoreContext } from '../../utils/GlobalState';

export default function CopyLink(props) {

    const [state, _] = useStoreContext();
    const [copySuccess, setCopySuccess] = useState('');
    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        e.target.focus();
        setCopySuccess('Copied!');
    };

    return (
        <div>
            {
                document.queryCommandSupported('copy') &&
                <div>
                    <button onClick={copyToClipboard}>Copy</button>
                    {copySuccess}
                </div>
            }
            <form>
                <textarea
                    ref={textAreaRef}
                    value={`localhost:3000/events/${props.shortid}`}
                />
            </form>
        </div>
    );
};