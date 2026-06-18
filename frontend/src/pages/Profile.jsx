import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

import {
    Mail,
    Package,
    Pencil,
    Lock,
    LogOut,
    Edit,
    Trash2,
    MapPin,
    Check,
    Tag,
} from "lucide-react";

function Profile() {
    const navigate = useNavigate();

    const email =
        localStorage.getItem("userEmail") || "";

    const nome =
        localStorage.getItem("userName") || "Usuário";

    const userId = Number(
        localStorage.getItem("userId")
    );

    const avatar = nome.charAt(0).toUpperCase();

    const [editingId, setEditingId] = useState(null);

    const [editedTitle, setEditedTitle] = useState("");

    const [editedDescription, setEditedDescription] = useState("");

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function carregarItens() {
            try {
                const response = await api.get("/items/");

                const meusItens = response.data.filter(
                    (item) => item.owner_id === userId
                );

                setItems(meusItens);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        carregarItens();
    }, []);

    const total = items.length;

    const encontrados = items.filter(
        (item) => item.is_found
    ).length;

    const perdidos = items.filter(
        (item) => !item.is_found
    ).length;

    function logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("userId");

        navigate("/");
    }

    async function handleDelete(itemId) {
        const confirmDelete = window.confirm(
            "Tem certeza que deseja excluir este item?"
        );

        if (!confirmDelete) return;

        try {
            await api.delete(`/items/${itemId}`);

            setItems(
                items.filter(
                    (item) => item.id !== itemId
                )
            );
        } catch (error) {
            console.log(error);

            alert(
                "Erro ao excluir item."
            );
        }
    }

    function handleEdit(item) {
        setEditingId(item.id);

        setEditedTitle(item.title);

        setEditedDescription(item.description);
    }

    async function handleSave(item) {
        try {
            const response = await api.put(
                `/items/${item.id}`,
                {
                    title: editedTitle,
                    description: editedDescription,
                    category: item.category,
                    location: item.location,
                    is_found: item.is_found,
                }
            );

            setItems(
                items.map((i) =>
                    i.id === item.id
                        ? response.data
                        : i
                )
            );

            setEditingId(null);

        } catch (error) {
            console.log(error);

            alert("Erro ao atualizar item.");
        }
    }

    return (
        <>
            <Navbar />

            <main className="profile-container">

                <section className="profile-banner">

                    <span>MINHA CONTA</span>

                    <h1>Meu Perfil</h1>

                    <p>
                        Gerencie seus dados e acompanhe todos os itens
                        cadastrados no sistema.
                    </p>

                </section>

                <section className="profile-layout">

                    {/* CARD DO USUÁRIO */}

                    <div className="profile-card">

                        <div className="avatar">

                            {avatar}

                        </div>

                        <h2>{nome}</h2>

                        <p className="email">

                            <Mail size={18} />

                            {email}

                        </p>

                        <p className="description">

                            Conta utilizada para acessar o Reencontra.

                        </p>

                        <div className="profile-stats">

                            <div>

                                <h3>{total}</h3>

                                <span>Itens</span>

                            </div>

                            <div>

                                <h3>{encontrados}</h3>

                                <span>Encontrados</span>

                            </div>

                            <div>

                                <h3>{perdidos}</h3>

                                <span>Perdidos</span>

                            </div>

                        </div>

                        <div className="profile-buttons">

                            <button>

                                <Pencil size={18} />

                                Editar Perfil

                            </button>

                            <button>

                                <Lock size={18} />

                                Alterar Senha

                            </button>

                            <button
                                className="logout"
                                onClick={logout}
                            >

                                <LogOut size={18} />

                                Sair

                            </button>

                        </div>

                    </div>

                    {/* CARD DOS ITENS */}

                    <div className="items-card">

                        <div className="items-header">

                            <h2>

                                <Package size={24} />

                                Meus Itens

                            </h2>

                            <span>

                                {total} cadastrados

                            </span>

                        </div>

                        {loading ? (

                            <p className="loading-items">

                                Carregando itens...

                            </p>

                        ) : items.length === 0 ? (

                            <div className="empty-items">

                                <Package size={42} />

                                <h3>

                                    Nenhum item cadastrado

                                </h3>

                                <p>

                                    Quando você cadastrar um item,
                                    ele aparecerá aqui.

                                </p>

                            </div>

                        ) : (

                            items.map((item) => (

                                <div
                                    className="my-item"
                                    key={item.id}
                                >

                                    <div className="item-content">

                                        {editingId === item.id ? (
                                            <>
                                                <input
                                                    value={editedTitle}
                                                    onChange={(e) =>
                                                        setEditedTitle(e.target.value)
                                                    }
                                                />

                                                <textarea
                                                    value={editedDescription}
                                                    onChange={(e) =>
                                                        setEditedDescription(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </>
                                        ) : (
                                            <>
                                                <h3>{item.title}</h3>

                                                <p>{item.description}</p>
                                            </>
                                        )}

                                        <div className="item-tags">

                                            <span>

                                                <Tag size={14} />

                                                {item.category}

                                            </span>

                                            <span>

                                                <MapPin size={14} />

                                                {item.location}

                                            </span>

                                        </div>

                                    </div>

                                    <div className="item-actions">

                                        <span
                                            className={
                                                item.is_found
                                                    ? "found"
                                                    : "lost"
                                            }
                                        >

                                            {item.is_found
                                                ? "Encontrado"
                                                : "Perdido"}

                                        </span>

                                        <button
                                            onClick={() =>
                                                editingId === item.id
                                                    ? handleSave(item)
                                                    : handleEdit(item)
                                            }
                                        >

                                            {editingId === item.id
                                                ? <Check size={16} />
                                                : <Edit size={16} />
                                            }

                                        </button>

                                        <button className="delete-btn"
                                            onClick={() => handleDelete(item.id)}>

                                            <Trash2 size={16} />

                                        </button>

                                    </div>

                                </div>

                            ))

                        )}

                    </div>

                </section>

            </main>

        </>
    );
}

export default Profile;