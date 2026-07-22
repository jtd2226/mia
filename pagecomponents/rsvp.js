import World from 'GL/scene';
import * as styles from 'styles/styles';
import { useState, useMemo, useRef } from 'react';

const rsvp = user =>
  fetch('/api/rsvp', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(user),
  });

function RSVPForm() {
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [hasName, setHasName] = useState(false);
  const [email, setEmail] = useState('');
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [fading, setFading] = useState(false);
  const sectionRef = useRef(null);

  const hasValidEmail = useMemo(() => {
    const sections = email.split('@');
    if (sections.length !== 2) return false;
    const [local, domain] = sections;
    if (!local || !domain) return false;
    const domainSections = domain.split('.');
    if (domainSections.length < 2) return false;
    const [domainName, domainExtension] = domainSections;
    if (!domainName || !domainExtension) return false;
    return true;
  }, [email]);

  const disabled = loading || !hasValidEmail;

  const fade = () =>
    new Promise(resolve => {
      if (!sectionRef.current) return resolve();
      sectionRef.current.ontransitionend = () => {
        setFading(false);
        requestAnimationFrame(() => {
          resolve();
          delete sectionRef.current.ontransitionend;
        });
      };
      setFading(true);
    });

  const handleRSVP = async () => {
    if (!hasName) {
      setHasName(true);
      fade();
      return;
    }
    if (disabled) return;
    setLoading(true);
    await Promise.all([
      fade(),
      rsvp({ name, email })
        .then(r => {
          console.log(r);
          return r.json();
        })
        .then(console.log)
        .catch(console.error),
    ]);
    setIsSignedUp(true);
    setLoading(false);
  };

  return (
    <span
      className="rsvp-section"
      ref={sectionRef}
      style={{
        display: isSignedUp && !fading ? 'none' : '',
        opacity: loading || fading ? 0 : 1,
      }}
    >
      <strong>~ get updates on music, fun & live shows ~</strong>
      <span className="rsvp-form">
        <input
          placeholder={hasName ? 'Enter your email' : 'Your Name'}
          value={hasName ? email : name}
          onChange={e => {
            if (hasName) {
              setEmail(e.currentTarget.value);
            } else {
              setName(e.currentTarget.value);
            }
          }}
          onKeyDown={e => e.key === 'Enter' && handleRSVP()}
        />
        <button onClick={() => handleRSVP()}>
          {hasName ? 'RSVP' : name.length ? 'Add' : 'Skip'}
        </button>
      </span>
      <em>By connecting you agree to receive updates from Lovpune via email</em>
    </span>
  );
}

export function SignupPage() {
  return (
    <span
      style={styles.form.mailingList.section}
      className="mailing-list-container"
    >
      <World
        amplitude={2}
        images="/img/EtherealOrb.png"
        style={styles.form.mailingList.canvas}
      />
      <RSVPForm />
    </span>
  );
}

export default function Home() {
  return (
    <main>
      <SignupPage />
    </main>
  );
}
