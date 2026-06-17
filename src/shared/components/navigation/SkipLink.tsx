const skipStyles = `
  .skip-link {
    position: absolute;
    top: -1000px;
    left: -1000px;
    width: 1px;
    height: 1px;
    overflow: hidden;
  }
  .skip-link:focus,
  .skip-link:focus-visible {
    position: fixed;
    top: 6px;
    left: 6px;
    width: auto;
    height: auto;
    display: inline-block;
    padding: var(--chakra-spacing-4);
    margin: var(--chakra-spacing-4);
    border: 2px solid var(--chakra-colors-text-accent);
    border-radius: var(--chakra-radii-md);
    background-color: var(--chakra-colors-bg-panel);
    color: var(--chakra-colors-text-heading);
    z-index: 9999;
    outline: none;
  }
`;

const SkipLink = () => (
  <>
    <style>{skipStyles}</style>
    <a href="#main-content" className="skip-link" data-nosnippet>
      Saltar al contenido principal
    </a>
  </>
);

export default SkipLink;
