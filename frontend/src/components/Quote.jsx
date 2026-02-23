import React, { useEffect, useState } from 'react';

const SimpleQuote = () => {
  const [state, setState] = useState({ quote: '', author: '', loading: true, error: null });

  useEffect(() => {
    fetch('https://corsproxy.io/?https://type.fit/api/quotes')
      .then((res) => res.json())
      .then((arr) => {
        if (Array.isArray(arr) && arr.length > 0) {
          const random = arr[Math.floor(Math.random() * arr.length)];
          setState({ quote: random.text, author: random.author || 'Unknown author', loading: false, error: null });
        } else {
          setState({ quote: '', author: '', loading: false, error: 'Unavailable quote.' });
        }
      })
      .catch(() => setState({ quote: '', author: '', loading: false, error: 'Unavailable quote.' }));
  }, []);

  if (state.loading) return <div>Učitavanje motivacionog citata...</div>;
  if (state.error) return <div>{state.error}</div>;
  return (
    <div style={{ marginTop: 40, padding: 20, background: '#fffbe6', borderRadius: 10, textAlign: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.07)' }}>
      <h4 style={{ fontSize: '0.8em', color: '#aca3a3', padding: 20 }}>Find inspiration in a quote and begin your creative journey</h4>
      <blockquote style={{ fontStyle: 'italic', color: '#b8860b', fontSize: '1.1em' }}>{state.quote}</blockquote>
      <div style={{ marginTop: 10, color: '#888' }}>— {state.author}</div>
    </div>
  );
};

export default SimpleQuote;