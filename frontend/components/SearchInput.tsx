'use client';

import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {formUrlQuery, removeKeysFromUrlQuery} from "@jsmastery/utils";
import { Search } from "lucide-react";

const SearchInput = () => {
    const pathname = usePathname();
    const router = useRouter();
    const searchParams = useSearchParams();
    const query = searchParams.get('topic') || '';

    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if(searchQuery) {
                const newUrl = formUrlQuery({
                    params: searchParams.toString(),
                    key: "topic",
                    value: searchQuery,
                });

                router.push(newUrl, { scroll: false });
            } else {
                if(pathname === '/companions') {
                    const newUrl = removeKeysFromUrlQuery({
                        params: searchParams.toString(),
                        keysToRemove: ["topic"],
                    });

                    router.push(newUrl, { scroll: false });
                }
            }
        }, 500)
    }, [searchQuery, router, searchParams, pathname]);

    return (
        <div className="relative border border-border bg-card hover:border-muted-foreground/30 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/15 rounded-xl flex items-center gap-2 px-3 py-1.5 h-10 transition-all shrink-0">
            <Search className="size-4 text-muted-foreground" />
            <input
                placeholder="Search companions..."
                className="outline-none border-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground w-[180px] sm:w-[220px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
    )
}
export default SearchInput;
