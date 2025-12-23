function AuthProgressbar({ level }: { level: number }) {
  const maxProgress = 5;

  return (
    <div className="w-full px-15">
      <progress
        className="w-full h-4 auth-progress rounded-full"
        value={level}
        max={maxProgress}
      />
    </div>
  );
}

export default AuthProgressbar;
