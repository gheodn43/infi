import React from 'react';
import { Link } from 'react-router-dom';

export default function DeckLink () {
    return (
        <Link to="/deck" className="btn text-white mb-0">
            Deck
        </Link>
    );
};

