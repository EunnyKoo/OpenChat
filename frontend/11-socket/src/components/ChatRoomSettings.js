import React, { useState } from 'react';
import { ChromePicker } from 'react-color';
import "../styles/color.css";

export default function ChatRoomSettings({ color, onColorChange }) {
    const handleColorChange = (color) => {
      onColorChange(color.hex);
    };

   return (
    <div>
      <ChromePicker color={color} onChange={handleColorChange} />
      <div
        style={{
          backgroundColor: color,
          padding: '20px',
          color: getContrastColor(color),
        }}
      >
      </div>
    </div>
  );
}

// 대조되는 텍스트 색상을 선택하는 함수
function getContrastColor(hexColor) {
  const threshold = 130; // 색상 값에 따라 적절한 대조 색상을 선택하기 위한 임계값
  const rgb = parseInt(hexColor.slice(1), 16); // 16진수를 10진수로 변환

  const r = (rgb >> 16) & 0xff;
  const g = (rgb >> 8) & 0xff;
  const b = (rgb >> 0) & 0xff;

  const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

  return luminance > threshold ? '#000000' : '#ffffff';
}


