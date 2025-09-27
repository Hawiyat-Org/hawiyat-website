    // app/api/templates/route.ts
    import { NextResponse } from 'next/server';
    import fs from 'fs';
    import path from 'path';

    interface Template {
    id: string;
    name: string;
    version: string;
    description: string;
    links: {
        github?: string;
        website?: string;
        docs?: string;
    };
    logo: string;
    tags: string[];
    }

    // In-memory cache with longer duration since we're only loading once
    let cachedData: Template[] | null = null;
    let cacheTimestamp: number = 0;
    const CACHE_DURATION = 60 * 60 * 1000; // 1 hour cache

    async function loadAllTemplates(): Promise<Template[]> {
    const now = Date.now();
    
    // Check cache first
    if (cachedData && (now - cacheTimestamp) < CACHE_DURATION) {
        return cachedData;
    }

    try {
        // Read from public/hawiyat_templates.json
        const filePath = path.join(process.cwd(), 'public', 'hawiyat_templates.json');
        
        if (!fs.existsSync(filePath)) {
        // Return cached data if file doesn't exist
        if (cachedData) return cachedData;
        throw new Error('Templates file not found');
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const data = JSON.parse(fileContent);
        const templates = Array.isArray(data) ? data : [];

        // Update cache
        cachedData = templates;
        cacheTimestamp = now;

        return templates;
    } catch (error) {
        // If there's an error but we have cached data, return it
        if (cachedData) return cachedData;
        throw error;
    }
    }

    export async function GET() {
    try {
        const templates = await loadAllTemplates();
        
        return NextResponse.json(templates, {
        headers: {
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400', // Aggressive caching
            'X-Total-Count': templates.length.toString(),
            'X-Cache': cachedData && (Date.now() - cacheTimestamp) < CACHE_DURATION ? 'HIT' : 'MISS'
        }
        });
    } catch (error: unknown) {
        console.error('Error loading all templates:', error);
        
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return NextResponse.json(
        { 
            error: 'Failed to load templates', 
            message: errorMessage,
            templates: [] 
        }, 
        { 
            status: 500,
            headers: {
            'Cache-Control': 'no-cache'
            }
        }
        );
    }
    }