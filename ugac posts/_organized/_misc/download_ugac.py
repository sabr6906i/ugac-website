import instaloader

USERNAME = input("Instagram username (must match saved session): ").strip()

L = instaloader.Instaloader(
    download_videos=True,
    download_video_thumbnails=False,
    download_geotags=False,
    download_comments=False,
    save_metadata=False,
    compress_json=False,
    post_metadata_txt_pattern="",
)

# Load session saved by: instaloader -l <USERNAME>
try:
    L.load_session_from_cookie_file(None)  # tries default browser cookies
except Exception:
    pass

try:
    L.load_session(USERNAME)
    print(f"Loaded saved session for {USERNAME}")
except FileNotFoundError:
    print(
        "No saved session found.\n"
        f"Run this first:  instaloader -l {USERNAME}\n"
        "Then re-run this script."
    )
    raise SystemExit(1)

profile = instaloader.Profile.from_username(L.context, "ugac.iitb")

for post in profile.get_posts():
    L.download_post(post, target=profile.username)
