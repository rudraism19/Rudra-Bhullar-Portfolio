import os
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_banner():
    # 2x Retina resolution for ultra-crisp display (3168 x 792)
    W, H = 3168, 792
    
    # Base image in RGBA
    img = Image.new("RGBA", (W, H), (235, 125, 0, 255))
    draw = ImageDraw.Draw(img)

    # 1. Radial Ambient Glow (Golden warmth in top-right)
    glow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    glow_draw = ImageDraw.Draw(glow)
    cx, cy = int(W * 0.72), int(H * 0.35)
    max_r = int(W * 0.45)
    for r in range(max_r, 0, -8):
        alpha = int((1 - r / max_r) ** 1.8 * 85)
        glow_draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r],
            fill=(255, 175, 45, alpha)
        )
    img = Image.alpha_composite(img, glow)
    draw = ImageDraw.Draw(img)

    # 2. Geometric Blueprint Grid Lines & Crosshairs
    grid = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    grid_draw = ImageDraw.Draw(grid)
    grid_size = 88
    for x in range(0, W, grid_size):
        grid_draw.line([(x, 0), (x, H)], fill=(20, 18, 14, 14), width=1)
    for y in range(0, H, grid_size):
        grid_draw.line([(0, y), (W, y)], fill=(20, 18, 14, 14), width=1)

    # Crosshairs at select intersections
    for x in [grid_size * 4, grid_size * 10, grid_size * 18, grid_size * 28]:
        for y in [grid_size * 2, grid_size * 6]:
            s = 8
            grid_draw.line([(x - s, y), (x + s, y)], fill=(20, 18, 14, 45), width=2)
            grid_draw.line([(x, y - s), (x, y + s)], fill=(20, 18, 14, 45), width=2)
            
    img = Image.alpha_composite(img, grid)
    draw = ImageDraw.Draw(img)

    # 3. Organic Curved Dark Foundation in Espresso Noir (#14120E)
    curve_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    curve_draw = ImageDraw.Draw(curve_layer)
    
    # Calculate smooth bezier-like S-curve for the bottom foundation
    pts = []
    start_x = int(W * 0.46)
    end_x = int(W * 0.65)
    y_bottom = H
    y_top = H - 190
    
    pts.append((start_x, y_bottom))
    num_steps = 60
    for i in range(num_steps + 1):
        t = i / num_steps
        # Cosine smoothstep easing
        ease = (1 - math.cos(t * math.pi)) / 2
        px = start_x + t * (end_x - start_x)
        py = y_bottom - ease * (y_bottom - y_top)
        pts.append((px, py))
        
    pts.append((W, y_top))
    pts.append((W, H))
    pts.append((start_x, H))
    
    curve_draw.polygon(pts, fill=(20, 18, 14, 255))
    img = Image.alpha_composite(img, curve_layer)
    draw = ImageDraw.Draw(img)

    # Fonts from C:/Windows/Fonts
    font_dir = "C:/Windows/Fonts"
    font_headline = ImageFont.truetype(os.path.join(font_dir, "impact.ttf"), 250)
    font_sub_headline = ImageFont.truetype(os.path.join(font_dir, "seguisb.ttf"), 30)
    font_body = ImageFont.truetype(os.path.join(font_dir, "segoeui.ttf"), 26)
    font_mono_bold = ImageFont.truetype(os.path.join(font_dir, "consolab.ttf"), 22)
    font_mono_sm = ImageFont.truetype(os.path.join(font_dir, "consolab.ttf"), 18)
    font_card_num = ImageFont.truetype(os.path.join(font_dir, "impact.ttf"), 38)
    font_card_lbl = ImageFont.truetype(os.path.join(font_dir, "consolab.ttf"), 15)

    # 4. Top Editorial Info Bar
    # Status Pill on Top-Left (Dark background for punchy contrast)
    pill_x, pill_y = 96, 44
    pill_w, pill_h = 760, 48
    draw.rounded_rectangle([pill_x, pill_y, pill_x + pill_w, pill_y + pill_h], radius=24, fill=(20, 18, 14, 255), outline=(44, 39, 32, 255), width=2)
    # Bright orange pulse dot
    draw.ellipse([pill_x + 18, pill_y + 18, pill_x + 30, pill_y + 30], fill=(235, 125, 0, 255))
    draw.text((pill_x + 42, pill_y + 13), "AVAILABLE FOR IMPACT ROLES & COLLABS // 2026 EDITION", font=font_mono_sm, fill=(250, 248, 242, 255))

    # Top-Center/Right Metadata Badges
    meta_items = [
        ("PUNJAB, INDIA", 190),
        ("TIMEZONE: IST (UTC+5:30)", 310),
        ("CSE GRADUATE • AI BUILDER", 330)
    ]
    cur_x = W - 920
    for label, bw in meta_items:
        draw.rounded_rectangle([cur_x, pill_y, cur_x + bw, pill_y + pill_h], radius=10, fill=(20, 18, 14, 255), outline=(44, 39, 32, 255), width=2)
        draw.text((cur_x + 16, pill_y + 14), label, font=font_mono_sm, fill=(243, 235, 216, 255))
        cur_x += bw + 14

    # 5. Avatar Safe Zone Label (Bottom Left)
    draw.text((96, H - 70), "← LINKEDIN PROFILE AVATAR ZONE", font=font_mono_sm, fill=(20, 18, 14, 150))

    # 6. Massive Condensed Typography (z-10)
    # Starts at x=560 so avatar never blocks it
    text_x = 560
    name_line1_y = 125
    name_line2_y = 315
    draw.text((text_x, name_line1_y), "RUDRA", font=font_headline, fill=(20, 18, 14, 255))
    draw.text((text_x, name_line2_y), "BHULLAR", font=font_headline, fill=(20, 18, 14, 255))

    # Subtitle / Role Tag below name (kept within 750px width so it doesn't collide with silhouette)
    sub_y = 575
    draw.line([(text_x, sub_y + 16), (text_x + 36, sub_y + 16)], fill=(20, 18, 14, 255), width=4)
    draw.text((text_x + 48, sub_y), "CREATIVE TECHNOLOGIST × AI SYSTEMS ENGINEER", font=font_sub_headline, fill=(20, 18, 14, 255))
    
    bio_line1 = "Architecting multimodal AI agents, scalable distributed backends"
    bio_line2 = "& high-performance digital systems with computer science rigor."
    draw.text((text_x, sub_y + 44), bio_line1, font=font_body, fill=(20, 18, 14, 230))
    draw.text((text_x, sub_y + 76), bio_line2, font=font_body, fill=(20, 18, 14, 230))
    
    cred_str = "B.Tech CSE • System Architecture • Deep Learning & Full-Stack"
    draw.text((text_x, sub_y + 112), cred_str, font=font_mono_sm, fill=(20, 18, 14, 180))

    # 7. Portrait Silhouette Layer (z-20)
    # Placed so it overlaps BHULLAR on the right
    hero_path = "public/rudra-hero-cropped.png"
    if os.path.exists(hero_path):
        sil_orig = Image.open(hero_path).convert("RGBA")
        target_h = 750
        scale = target_h / sil_orig.height
        target_w = int(sil_orig.width * scale)
        sil_resized = sil_orig.resize((target_w, target_h), Image.Resampling.LANCZOS)

        sil_x = 1380
        sil_y = H - target_h + 10  # bottom anchored

        # Create soft ambient shadow
        shadow_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        sh_alpha = sil_resized.split()[3].point(lambda a: int(a * 0.65))
        sh_mask = Image.new("RGBA", sil_resized.size, (0, 0, 0, 255))
        sh_mask.putalpha(sh_alpha)
        sh_mask = sh_mask.filter(ImageFilter.GaussianBlur(radius=28))
        shadow_layer.paste(sh_mask, (sil_x + 15, sil_y + 20), sh_mask)
        img = Image.alpha_composite(img, shadow_layer)

        # Paste silhouette
        img.paste(sil_resized, (sil_x, sil_y), sil_resized)
        draw = ImageDraw.Draw(img)

    # 8. Right Column: Rich Specialization & Metrics Panel (z-30)
    r_panel_x = 2160
    r_panel_w = 910
    
    # 8A. Core Specialization Box
    box_y = 120
    box_h = 290
    # Semi-transparent dark card
    box_layer = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    box_draw = ImageDraw.Draw(box_layer)
    box_draw.rounded_rectangle([r_panel_x, box_y, r_panel_x + r_panel_w, box_y + box_h], radius=24, fill=(20, 18, 14, 35), outline=(20, 18, 14, 70), width=2)
    img = Image.alpha_composite(img, box_layer)
    draw = ImageDraw.Draw(img)

    # Box Header
    draw.ellipse([r_panel_x + 28, box_y + 25, r_panel_x + 40, box_y + 37], fill=(20, 18, 14, 255))
    draw.text((r_panel_x + 50, box_y + 20), "CORE SPECIALIZATIONS & EXPERTISE", font=font_mono_bold, fill=(20, 18, 14, 255))

    # Two column specs
    col1 = [
        "› Multimodal AI & Agentic RAG",
        "› High-Performance Full-Stack",
        "› Scalable Microservices"
    ]
    col2 = [
        "› Distributed Architecture",
        "› Java & DSA Algorithms",
        "› Autonomous Workflow Loops"
    ]
    for idx, item in enumerate(col1):
        draw.text((r_panel_x + 35, box_y + 68 + idx * 36), item, font=font_body, fill=(20, 18, 14, 255))
    for idx, item in enumerate(col2):
        draw.text((r_panel_x + 480, box_y + 68 + idx * 36), item, font=font_body, fill=(20, 18, 14, 255))

    # Tech Stack Pills inside Box
    techs = ["Next.js 14", "TypeScript", "Python", "Java", "LangChain", "TailwindCSS", "PostgreSQL", "PyTorch"]
    tx = r_panel_x + 35
    ty = box_y + 205
    for t_idx, tech in enumerate(techs):
        tw = int(draw.textlength(tech, font=font_mono_sm)) + 24
        draw.rounded_rectangle([tx, ty, tx + tw, ty + 38], radius=8, fill=(20, 18, 14, 255))
        draw.text((tx + 12, ty + 10), tech, font=font_mono_sm, fill=(243, 235, 216, 255))
        tx += tw + 10

    # 8B. Verified Metrics Strip (3 Cards)
    metrics = [
        ("10+", "PROJECTS BUILT"),
        ("5+", "HACKATHONS WON/ENTERED"),
        ("1000+", "BUILD HOURS & COMMITS")
    ]
    m_y = 430
    m_w = int((r_panel_w - 28) / 3)
    m_h = 145
    for i, (num, lbl) in enumerate(metrics):
        mx = r_panel_x + i * (m_w + 14)
        # Deep espresso noir background card with subtle border
        draw.rounded_rectangle([mx, m_y, mx + m_w, m_y + m_h], radius=16, fill=(20, 18, 14, 255), outline=(44, 39, 32, 255), width=2)
        draw.text((mx + 24, m_y + 24), num, font=font_card_num, fill=(235, 125, 0, 255))
        draw.text((mx + 24, m_y + 88), lbl, font=font_card_lbl, fill=(163, 158, 145, 255))

    # 8C. Bottom Links & Magnetic Connect CTA Button (On Dark #14120E Foundation)
    footer_y = 600
    draw.line([(r_panel_x, footer_y), (r_panel_x + r_panel_w, footer_y)], fill=(44, 39, 32, 255), width=2)
    
    # High-contrast pristine light text on the dark foundation
    contact_str = "github.com/rudrabhullar  •  linkedin.com/in/rudra-bhullar  •  rudraism19@gmail.com"
    draw.text((r_panel_x, footer_y + 25), contact_str, font=font_mono_sm, fill=(163, 158, 145, 255))

    # Prominent Orange CTA Button in bottom-right corner
    btn_w, btn_h = 320, 68
    btn_x = r_panel_x + r_panel_w - btn_w
    btn_y = footer_y + 55
    draw.rounded_rectangle([btn_x, btn_y, btn_x + btn_w, btn_y + btn_h], radius=14, fill=(235, 125, 0, 255), outline=(20, 18, 14, 60), width=2)
    draw.text((btn_x + 28, btn_y + 22), "LET'S BUILD TOGETHER", font=font_mono_bold, fill=(20, 18, 14, 255))
    
    # Arrow square
    arr_x = btn_x + btn_w - 52
    arr_y = btn_y + 14
    draw.rounded_rectangle([arr_x, arr_y, arr_x + 38, arr_y + 38], radius=8, fill=(20, 18, 14, 255))
    draw.text((arr_x + 11, arr_y + 8), "→", font=font_mono_bold, fill=(235, 125, 0, 255))

    # Save 2x Retina PNG
    os.makedirs("exports", exist_ok=True)
    out_2x = "exports/rudra-linkedin-banner-retina-3168x792.png"
    img.save(out_2x, "PNG")
    print(f"Saved 2x Retina banner to {out_2x}")

    # Downsample with Lanczos to exact standard LinkedIn dimension (1584 x 396)
    out_1x = "exports/rudra-linkedin-banner-1584x396.png"
    img_1x = img.resize((1584, 396), Image.Resampling.LANCZOS)
    img_1x.save(out_1x, "PNG")
    print(f"Saved standard LinkedIn banner to {out_1x}")

if __name__ == "__main__":
    create_banner()
