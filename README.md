# Booking Form

A booking form application that collects business information and sends it to an n8n webhook.

## Features

- Full-stack JavaScript application with React and Express
- Form validation with Zod
- Tailwind CSS styling
- n8n webhook integration

## Form Fields

**Required:**
- Name
- Business Name
- Business Website
- Industry
- At least one contact method (Email or Phone)

**Optional:**
- Current Target Audience
- Key Message to Communicate
- Visual References/Examples

## Setup

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

The application will be available at http://localhost:5000

## Webhook Integration

Form submissions are sent to the configured n8n webhook endpoint. The payload includes:
- All form fields
- Timestamp of submission

## Repository

Created for: Pu11en
Repository: https://github.com/Pu11en/booking-form
