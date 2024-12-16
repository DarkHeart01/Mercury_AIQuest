import React from "react";
import { Card, Tag } from "rsuite";

// Define the structure for dynamic data
interface AppCardProps {
  title: string;
  description: string;
  imageUrl?: string;  // Make the imageUrl optional
  tags: { id: number; name: string; color?: string; icon?: string }[];
  createdAt: string;
}

// Supported Tag Colors
const validTagColors = ["red", "orange", "yellow", "green", "cyan", "blue", "violet"] as const;

export const AppCard: React.FC<AppCardProps> = ({ title, description, imageUrl, tags, createdAt }) => {
  return (
    <Card
      shaded
      bordered
      style={{
        width: "100%",
        maxWidth: "1000px", // Increased width
        minHeight: "200px", // Increased height
        margin: "16px auto",
        display: "flex",
        flexDirection: "row",
        border: "2px solid white",
        borderRadius: "8px",
        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        backgroundColor: "#1e1e1e",
        padding: "16px", // Increased padding
      }}
    >
      {/* Image Section - Render only if imageUrl is provided */}
      {imageUrl && (
        <div
          style={{
            width: "180px", // Image container width
            height: "180px", // Image container height
            marginRight: "16px",
            borderRadius: "8px", // Increased border radius for a more rounded look
            overflow: "hidden",
          }}
        >
          <img
            src={imageUrl}
            alt="Content Image"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover", // Ensures the image fits correctly without distortion
            }}
          />
        </div>
      )}

      {/* Content Section */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
        <h4 style={{ margin: "8px 0", fontSize: "18px", fontWeight: "600", color: "#fff" }}>{title}</h4>
        <p
          style={{
            fontSize: "14px",
            color: "#bbb",
            margin: "8px 0",
            lineHeight: "1.6",
          }}
        >
          {description}
        </p>

        {/* Tag Section */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            marginTop: "auto",
          }}
        >
          {tags.map((tag) => (
            <Tag
              key={tag.id}
              color={tag.color && validTagColors.includes(tag.color as any) ? (tag.color as any) : "blue"}
              style={{
                fontSize: "12px",
                padding: "6px 10px",
                display: "flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              {tag.icon && <span>{tag.icon}</span>}
              {tag.name}
            </Tag>
          ))}
        </div>
      </div>
    </Card>
  );
};




  

