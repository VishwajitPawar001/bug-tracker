function Button({ text, color = "blue", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`bg-${color}-600 hover:bg-${color}-700 px-4 py-2 rounded-lg text-white transition`}
    >
      {text}
    </button>
  );
}

export default Button;