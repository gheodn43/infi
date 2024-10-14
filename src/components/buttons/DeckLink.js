import React from 'react';
import { Link } from 'react-router-dom';

export default function DeckLink () {
    return (
        <Link to="/deck" className="text-white m-1 text-decoration-none">
            Deck
        </Link>
    );
};

