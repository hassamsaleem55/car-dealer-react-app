import { useState, useRef, useEffect } from "react";
import { Check, ChevronUp, ChevronDown, X } from "lucide-react";
import DotLoader from "@components-dir/loader";
import { type DropdownFlexibleProps } from "./dropdown.types";

export default function DropdownFlexible({
  category,
  options,
  onChange,
  multiSelect = false,
  defaultValue = [],
  loading = false,
  searchable = false,
  showTags = false,
}: DropdownFlexibleProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string[]>(
    Array.isArray(defaultValue) ? defaultValue : [defaultValue]
  );
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (value: string) => {
    if (loading) return;

    let updated: string[];
    if (multiSelect) {
      updated = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value];
    } else {
      updated = [value];
      setIsOpen(false);
    }

    setSelected(updated);
    onChange?.(updated);
    setSearch(""); // clear search after selection
  };

  const removeTag = (value: string) => {
    const updated = selected.filter((v) => v !== value);
    setSelected(updated);
    onChange?.(updated);
  };

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(search.toLowerCase())
  );

  const selectedLabel = !showTags
    ? selected.length > 0 && !multiSelect
      ? options
          .filter((opt) => selected.includes(opt.value))
          .map((opt) => opt.label)
          .join(", ")
      : category
    : "";

  return (
    <div className="dropdown" ref={dropdownRef}>
      {/* Button with tags + search */}
      <div
        className="dropdown-btn"
        onClick={() => !loading && setIsOpen(!isOpen)}
      >
        {showTags && selected.length > 0 && (
          <div className="dropdown-btn__tags-list">
            {selected.map((val) => {
              const opt = options.find((o) => o.value === val);
              if (!opt) return null;
              return (
                <span key={val} className="dropdown-btn__tag">
                  {opt.value.toUpperCase()}
                  <X
                    className="dropdown-btn__tag-cross"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTag(val);
                    }}
                  />
                </span>
              );
            })}
          </div>
        )}

        {searchable && (
          <input
            ref={inputRef}
            type="text"
            placeholder={selected.length === 0 ? category : ""}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setIsOpen(true);
            }}
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(true);
            }}
            className="dropdown-btn__search-input"
          />
        )}

        {!showTags && !searchable && (
          <span className="text-basicFont">{selectedLabel || category}</span>
        )}

        <span className="dropdown-btn__icon">
          {isOpen ? (
            <ChevronUp className="w-5 h-5" />
          ) : (
            <ChevronDown className="w-5 h-5" />
          )}
        </span>
      </div>

      {/* Options */}
      {isOpen && (
        <div className="dropdown-options">
          {loading ? (
            <div className="flex justify-center items-center py-6">
              <DotLoader size="sm" />
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((option) => {
              const isSelected = selected.includes(option.value);
              return (
                <div
                  key={option.id}
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => toggleOption(option.value)}
                  className={`dropdown-option ${
                    isSelected ? "bg-gray-50 text-primary" : ""
                  }`}
                >
                  {multiSelect && isSelected && (
                    <span className="dropdown-option__check">
                      <Check className="w-5 h-5" />
                    </span>
                  )}
                  <span className={multiSelect ? "pl-10" : "pl-4"}>
                    {option.label}
                  </span>
                </div>
              );
            })
          ) : (
            <div className="px-4 py-3 text-gray-400 text-sm">
              No options available
            </div>
          )}
        </div>
      )}
    </div>
  );
}
