export function Bookmarks({ names }) {
  return (
    <div className="bookmarks">
      {names.map((name) => (
        <a key={name} href={`#${name}`}>
          {name}
        </a>
      ))}
    </div>
  );
}
