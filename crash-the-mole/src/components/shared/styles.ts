import styled from "styled-components";

export const GameContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-family: Arial, sans-serif;
    padding: 20px;
    background-color: #f0f8ff;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 500px;
    margin: 0 auto;
`;

export const GameInfoContainer = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    width: 100%;
    margin: 20px 0;
`;

export const GameInfoBox = styled.div`
    padding: 10px 15px;
`;

export const Grid = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 20px 0;
`;

export const Cell = styled.div<{ $hasMole: boolean }>`
    width: 80px;
    height: 80px;
    background-color: ${props => props.$hasMole ? '#ffcccb' : '#e0e0e0'};
    border-radius: 8px;
    display: flex;
    justify-content:center;
    align-items: center;
    cursor: pointer;
    transition: background-color 0.2s;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const Mole = styled.div`
    font-size: 36px;
    user-select: none;
`;

export const StartButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;
`;

export const EndButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #e20909;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;
`;

export const ResetButton = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    background-color: #042453;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 10px;
    transition: background-color 0.3s;
`;