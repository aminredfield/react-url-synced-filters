// src/components/SocialLinks.tsx
import * as React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import TelegramIcon from '@mui/icons-material/Telegram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {
    Box,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material';

export type SocialLink = {
    name: string;
    icon: React.ReactNode;
    url: string;
    color: string;
};



const SocialMediaLinks = () => {
    const socialLinks: SocialLink[] = [
        {
            name: 'GitHub',
            icon: <GitHubIcon />,
            url: 'https://github.com/aminredfield',
            color: '#333',
        },
        {
            name: 'Telegram',
            icon: <TelegramIcon />,
            url: 'https://t.me/cntz_001',
            color: '#0088cc',
        },
        {
            name: 'LinkedIn',
            icon: <LinkedInIcon />,
            url: 'https://linkedin.com/in/amin-redfield-98a10b365',
            color: '#0077b5',
        },
    ];



    return (
        <Box sx={{ display: 'flex', gap: 1 }}>
            {socialLinks.map((link) => (
                <IconButton
                    key={link.name}
                    component="a"
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{
                        color: 'text.primary',
                        '&:hover': {
                            color: link.color,
                            transform: 'translateY(-2px)',
                            transition: 'all 0.2s ease-in-out',
                        },
                    }}
                    aria-label={link.name}
                >
                    {link.icon}
                </IconButton>
            ))}
        </Box>
    );
};

export default SocialMediaLinks;
