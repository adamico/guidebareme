# Static Next.js Website

This project is a static Next.js website migrated from HTML content in `old_page`.

## Getting Started

1.  **Install dependencies:**

    ```bash
    npm install
    ```

2.  **Run the development server:**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Building for Production

To create a static export (located in the `out` directory):

```bash
npm run build
```

## Structure

*   `app/page.tsx`: Main entry point.
*   `app/content.tsx`: Contains the migrated HTML content.
*   `old_page/`: Original source HTML files.
