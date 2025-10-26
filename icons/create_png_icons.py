from PIL import Image, ImageDraw, ImageFont
import sys

def create_water_drop_icon(size):
    # Create image with transparent background
    img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)
    
    # Draw gradient background circle
    center = size // 2
    radius = int(size * 0.45)
    
    # Draw circle with gradient effect
    for i in range(radius, 0, -1):
        alpha = int(255 * (i / radius))
        color1 = (102, 126, 234, alpha)  # #667eea
        color2 = (118, 75, 162, alpha)   # #764ba2
        blend = (
            int(color1[0] + (color2[0] - color1[0]) * (radius - i) / radius),
            int(color1[1] + (color2[1] - color1[1]) * (radius - i) / radius),
            int(color1[2] + (color2[2] - color1[2]) * (radius - i) / radius),
            alpha
        )
        draw.ellipse([center - i, center - i, center + i, center + i], fill=blend)
    
    # Draw water drop shape
    drop_size = int(size * 0.5)
    drop_x = center
    drop_y = int(size * 0.25)
    
    # Water drop path (simplified)
    points = []
    for angle in range(0, 360, 10):
        import math
        rad = math.radians(angle)
        if angle < 180:
            r = drop_size * 0.35
            x = drop_x + r * math.sin(rad)
            y = drop_y + drop_size * 0.65 + r * (1 - math.cos(rad))
        else:
            r = drop_size * 0.35
            x = drop_x + r * math.sin(rad)
            y = drop_y + drop_size * 0.65 + r * (1 - math.cos(rad))
        points.append((x, y))
    
    # Draw white water drop
    draw.ellipse([
        drop_x - drop_size//3, 
        drop_y, 
        drop_x + drop_size//3, 
        drop_y + int(drop_size * 0.8)
    ], fill=(255, 255, 255, 242))
    
    # Add highlight
    highlight_size = drop_size // 5
    draw.ellipse([
        drop_x - highlight_size - drop_size//6,
        drop_y + drop_size//6,
        drop_x - drop_size//6,
        drop_y + drop_size//6 + highlight_size
    ], fill=(255, 255, 255, 100))
    
    return img

# Create all icon sizes
sizes = [16, 32, 48, 128]
for size in sizes:
    img = create_water_drop_icon(size)
    img.save(f'icon{size}.png', 'PNG')
    print(f'✓ Created icon{size}.png')

print('\n✨ All PNG icons created successfully!')
