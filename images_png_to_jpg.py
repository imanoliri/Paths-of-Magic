import os
from PIL import Image


def convert_png_to_jpg(directory):
    # Loop through all files in the given directory
    for filename in os.listdir(directory):
        if filename.lower().endswith(".png"):
            # Construct the full file path
            png_path = os.path.join(directory, filename)

            # Open the .png image
            with Image.open(png_path) as img:
                # Create a white background image
                white_background = Image.new("RGB", img.size, (255, 255, 255))

                # Paste the .png image onto the white background, using the alpha channel as a mask
                img = img.convert("RGBA")
                white_background.paste(
                    img, mask=img.split()[3]
                )  # Use alpha channel as mask

                # Create the new .jpg file name
                jpg_filename = os.path.splitext(filename)[0] + ".jpg"
                jpg_path = os.path.join(directory, jpg_filename)

                # Save the image as .jpg
                white_background.save(jpg_path, "JPEG")
                os.remove(png_path)

            print(f"Converted {filename} to {jpg_filename}")


# Example usage
directory_path = "images"
convert_png_to_jpg(directory_path)
